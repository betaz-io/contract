pub use crate::{
    impls::sale::{
        data,
        data::{Data, *},
        sale, *,
    },
    traits::{error::Error, sale::*},
};
use ink::{env::CallFlags, prelude::vec::Vec};
use openbrush::{
    contracts::{access_control::*, ownable::*, pausable::*},
    modifiers,
    traits::{AccountId, Balance, Storage, Timestamp},
};

pub trait SalePoolTraitImpl:
    Storage<Data>
    + access_control::MembersManager
    + access_control::Internal
    + access_control::AccessControlImpl
    + Storage<access_control::Data>
    + Storage<pausable::Data>
    + Storage<ownable::Data>
    + pausable::Internal
    + ownable::Internal
    + ownable::Ownable
    + pausable::Pausable
{
    // EXECUTE FUNCTIONS
    // Change state contract
    #[modifiers(only_owner)]
    fn change_state(&mut self) -> Result<(), Error> {
        Ok(self._switch_pause()?)
    }

    // emit event
    fn _emit_sale_pool_buy_event(&self, _buyer: AccountId, _amount: Balance, _fee: Balance);
    fn _emit_add_whitelist_event(
        &self,
        _type: PoolType,
        _buyer: AccountId,
        _amount: Balance,
        _price: Balance,
    );
    fn _emit_update_whitelist_event(
        &self,
        _type: PoolType,
        _buyer: AccountId,
        _amount: Balance,
        _price: Balance,
    );
    fn _emit_whitelist_buy_event(
        &self,
        _type: PoolType,
        _buyer: AccountId,
        _buy_amount: Balance,
        _purchased_amount: Balance,
    );

    fn _emit_mint_token_event(&self, _contract_address: AccountId, _amount: Balance);
    fn _emit_burn_token_event(&self, _contract_address: AccountId, _amount: Balance);

    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn add_pool_by_pool_type(
        &mut self,
        pool_type: PoolType,
        buy_status: bool,
        end_time_buy: Timestamp,
        total_amount: Balance,
        total_purchased_amount: Balance,
        price: Balance,
    ) -> Result<(), Error> {
        if self
            .data::<data::Data>()
            .pool_sale_info
            .get(&pool_type)
            .is_some()
        {
            return Err(Error::PoolIsExists);
        }

        if end_time_buy < Self::env().block_timestamp() {
            return Err(Error::InvalidEndTime);
        }

        if total_purchased_amount > total_amount {
            return Err(Error::InvalidTotalPurchasedAmount);
        }

        let pool_info = PoolSaleInfo {
            buy_status,
            end_time_buy,
            total_amount,
            total_purchased_amount,
            price,
        };

        let mint_amount: u128 = total_amount.checked_sub(total_purchased_amount).unwrap();
        if Psp22Ref::mint(
            &self.data::<Data>().betaz_token_address,
            Self::env().account_id(),
            mint_amount,
        )
        .is_ok()
        {
            self.data::<data::Data>()
                .pool_sale_info
                .insert(&pool_type, &pool_info);
        } else {
            return Err(Error::CannotMint);
        }

        Ok(())
    }

    // buy with sale pool
    #[modifiers(when_not_paused)]
    fn buy_with_sale_pool(&mut self, amount: Balance) -> Result<(), Error> {
        let caller = Self::env().caller();
        let fee = Self::env().transferred_value();

        if let Some(mut pool_sale_info) = self
            .data::<data::Data>()
            .pool_sale_info
            .get(&PoolType::Sale)
        {
            if !pool_sale_info.buy_status {
                return Err(Error::TokensCanNotPurchased);
            }
            if Self::env().block_timestamp() > pool_sale_info.end_time_buy {
                return Err(Error::CannotBuyAtThisTime);
            }

            let decimal = Psp22Ref::token_decimals(&self.data::<data::Data>().betaz_token_address);

            // check whitelist
            if let Some(mut whitelist_info) = self
                .data::<data::Data>()
                .whitelist
                .get(&(&PoolType::Sale, &caller))
            {
                // price to buy amount of token
                let price = whitelist_info
                    .price
                    .checked_mul(amount)
                    .ok_or(Error::CheckedOperations)?
                    .checked_div(10_u128.pow(decimal as u32))
                    .ok_or(Error::CheckedOperations)?;

                if fee < price {
                    return Err(Error::InvalidFee);
                }
                let remaining_amount = whitelist_info
                    .amount
                    .checked_sub(whitelist_info.purchased_amount)
                    .unwrap();

                if amount > remaining_amount {
                    return Err(Error::NotEnoughBalance);
                }
                // Transfer token to caller
                let builder = Psp22Ref::transfer_builder(
                    &self.data::<data::Data>().betaz_token_address,
                    caller,
                    amount,
                    Vec::<u8>::new(),
                )
                .call_flags(CallFlags::default().set_allow_reentry(true));

                let transfer_result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => Err(Error::CannotTransfer),
                };

                if transfer_result.is_ok() {
                    whitelist_info.purchased_amount =
                        whitelist_info.purchased_amount.checked_add(amount).unwrap();
                    self.data::<data::Data>()
                        .whitelist
                        .insert(&(&PoolType::Sale, &caller), &whitelist_info);
                    self._emit_whitelist_buy_event(
                        PoolType::Sale,
                        caller,
                        amount,
                        whitelist_info.purchased_amount,
                    )
                }
            } else {
                let remaining_amount = pool_sale_info
                    .total_amount
                    .checked_sub(pool_sale_info.total_purchased_amount)
                    .unwrap();

                // price to buy amount of token
                let price = pool_sale_info
                    .price
                    .checked_mul(amount)
                    .ok_or(Error::CheckedOperations)?
                    .checked_div(10_u128.pow(decimal as u32))
                    .ok_or(Error::CheckedOperations)?;

                if fee < price {
                    return Err(Error::InvalidFee);
                }

                if amount > remaining_amount {
                    return Err(Error::NotEnoughBalance);
                }
                // Transfer token to caller
                let builder = Psp22Ref::transfer_builder(
                    &self.data::<data::Data>().betaz_token_address,
                    caller,
                    amount,
                    Vec::<u8>::new(),
                )
                .call_flags(CallFlags::default().set_allow_reentry(true));

                let transfer_result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => Err(Error::CannotTransfer),
                };

                if transfer_result.is_ok() {
                    pool_sale_info.total_purchased_amount = pool_sale_info
                        .total_purchased_amount
                        .checked_add(amount)
                        .unwrap();
                    self.data::<data::Data>()
                        .pool_sale_info
                        .insert(&PoolType::Sale, &pool_sale_info);
                    self._emit_sale_pool_buy_event(caller, amount, fee)
                }
            }
        } else {
            return Err(Error::PoolNotExists);
        }

        Ok(())
    }

    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn add_whitelist(
        &mut self,
        pool_type: PoolType,
        account: AccountId,
        amount: Balance,
        price: Balance,
    ) -> Result<(), Error> {
        if let Some(mut pool_sale_info) = self.data::<Data>().pool_sale_info.get(&pool_type) {
            if self
                .data::<Data>()
                .whitelist
                .get(&(&pool_type, &account))
                .is_some()
            {
                return Err(Error::WhitelistInfoExist);
            }

            let whitelist_info = WhitelistInfo {
                amount,
                price,
                purchased_amount: 0,
            };

            // add white list account
            self.data::<Data>()
                .whitelist
                .insert(&(&pool_type, &account), &whitelist_info);
            self.data::<Data>()
                .whitelist_account
                .insert(pool_type, &account);

            // emit event
            self._emit_add_whitelist_event(pool_type, account, amount, price);

            // Add pool_sale_info
            if amount
                > pool_sale_info
                    .total_amount
                    .checked_sub(pool_sale_info.total_purchased_amount)
                    .unwrap()
            {
                return Err(Error::NotEnoughBalance);
            } else {
                pool_sale_info.total_purchased_amount = pool_sale_info
                    .total_purchased_amount
                    .checked_add(amount)
                    .unwrap();
                self.data::<Data>()
                    .pool_sale_info
                    .insert(&pool_type, &pool_sale_info)
            }
        } else {
            return Err(Error::PoolNotExists);
        }

        Ok(())
    }

    // add whitelist
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn add_multi_whitelists(
        &mut self,
        pool_type: PoolType,
        accounts: Vec<AccountId>,
        amounts: Vec<Balance>,
        prices: Vec<Balance>,
    ) -> Result<(), Error> {
        if let Some(mut pool_sale_info) = self.data::<Data>().pool_sale_info.get(&pool_type) {
            let whitelist_count = accounts.len();
            if whitelist_count == 0
                || whitelist_count != amounts.len()
                || whitelist_count != prices.len()
            {
                return Err(Error::InvalidWhitelistData);
            }

            let mut total_amount: Balance = 0;

            for i in 0..whitelist_count {
                if self
                    .data::<Data>()
                    .whitelist
                    .get(&(&pool_type, &accounts[i]))
                    .is_some()
                {
                    return Err(Error::WhitelistInfoExist);
                }

                total_amount = total_amount
                    .checked_add(amounts[i])
                    .ok_or(Error::CheckedOperations)?;

                let whitelist_info = WhitelistInfo {
                    amount: amounts[i],
                    price: prices[i],
                    purchased_amount: 0,
                };

                // add white list account
                self.data::<Data>()
                    .whitelist
                    .insert(&(&pool_type, &accounts[i]), &whitelist_info);
                self.data::<Data>()
                    .whitelist_account
                    .insert(pool_type, &accounts[i]);

                // emit event
                self._emit_add_whitelist_event(pool_type, accounts[i], amounts[i], prices[i]);
            }

            // Add pool_sale_info
            if total_amount
                > pool_sale_info
                    .total_amount
                    .checked_sub(pool_sale_info.total_purchased_amount)
                    .unwrap()
            {
                return Err(Error::NotEnoughBalance);
            } else {
                pool_sale_info.total_purchased_amount = pool_sale_info
                    .total_purchased_amount
                    .checked_add(total_amount)
                    .unwrap();
                self.data::<Data>()
                    .pool_sale_info
                    .insert(&pool_type, &pool_sale_info)
            }
        } else {
            return Err(Error::PoolNotExists);
        }

        Ok(())
    }

    // update whitelist
    #[modifiers(when_not_paused)]
    #[modifiers(only_role(ADMINER))]
    fn update_multi_whitelists(
        &mut self,
        pool_type: PoolType,
        accounts: Vec<AccountId>,
        amounts: Vec<Balance>,
        prices: Vec<Balance>,
    ) -> Result<(), Error> {
        if let Some(mut pool_sale_info) = self.data::<Data>().pool_sale_info.get(&pool_type) {
            let whitelist_count = accounts.len();
            if whitelist_count == 0
                || whitelist_count != amounts.len()
                || whitelist_count != prices.len()
            {
                return Err(Error::InvalidWhitelistData);
            }

            let total_in = amounts.iter().sum();
            let mut total_out: Balance = 0;

            for i in 0..whitelist_count {
                if let Some(mut whitelist_info) = self
                    .data::<Data>()
                    .whitelist
                    .get(&(&pool_type, &accounts[i]))
                {
                    // User already purchased, cannot update
                    if whitelist_info.purchased_amount > 0 {
                        return Err(Error::WhitelistBuyerPurchased);
                    }

                    // Get total out
                    total_out = total_out
                        .checked_add(whitelist_info.amount)
                        .ok_or(Error::CheckedOperations)?;

                    // Update new white list info
                    whitelist_info.amount = amounts[i];
                    whitelist_info.price = prices[i];

                    self.data::<Data>()
                        .whitelist
                        .insert(&(&pool_type, &accounts[i]), &whitelist_info);
                } else {
                    return Err(Error::WhitelistInfoExist);
                }

                // emit event
                self._emit_update_whitelist_event(pool_type, accounts[i], amounts[i], prices[i]);
            }

            // update pool_sale_info
            let total_purchased_amount = pool_sale_info
                .total_purchased_amount
                .checked_add(total_in)
                .unwrap()
                .checked_sub(total_out)
                .unwrap();
            if total_purchased_amount > pool_sale_info.total_amount {
                return Err(Error::NotEnoughBalance);
            }
            // if total_purchased_amount > pool_sale_info.total_purchased_amount {
            //     let difference = total_purchased_amount
            //         .checked_sub(pool_sale_info.total_purchased_amount)
            //         .unwrap();
            //     if difference
            //         > pool_sale_info
            //             .total_amount
            //             .checked_sub(pool_sale_info.total_purchased_amount)
            //             .unwrap()
            //     {
            //         return Err(Error::NotEnoughBalance);
            //     } else {
            //         if Psp22Ref::burn(
            //             &self.data::<Data>().betaz_token_address,
            //             Self::env().account_id(),
            //             difference,
            //         )
            //         .is_ok()
            //         {
            //             self._emit_burn_token_event(Self::env().account_id(), difference);
            //         } else {
            //             return Err(Error::CannotBurn);
            //         }
            //         pool_sale_info.total_purchased_amount = total_purchased_amount;
            //         self.data::<Data>()
            //             .pool_sale_info
            //             .insert(&pool_type, &pool_sale_info)
            //     }
            // } else {
            //     let difference = pool_sale_info.total_purchased_amount
            //         .checked_sub(total_purchased_amount)
            //         .unwrap();
            //     if Psp22Ref::mint(
            //         &self.data::<Data>().betaz_token_address,
            //         Self::env().account_id(),
            //         difference,
            //     )
            //     .is_ok()
            //     {
            //         self._emit_mint_token_event(Self::env().account_id(), difference);
            //     } else {
            //         return Err(Error::CannotMint);
            //     }                    
            //     pool_sale_info.total_purchased_amount = total_purchased_amount;
            //     self.data::<Data>()
            //         .pool_sale_info
            //         .insert(&pool_type, &pool_sale_info)
            // }
            pool_sale_info.total_purchased_amount = total_purchased_amount;
            self.data::<Data>()
                .pool_sale_info
                .insert(&pool_type, &pool_sale_info)
           
        } else {
            return Err(Error::PoolNotExists);
        }

        Ok(())
    }

    // buy with whitelist
    #[modifiers(when_not_paused)]
    fn whitelist_buy(&mut self, pool_type: PoolType, amount: Balance) -> Result<(), Error> {
        let caller = Self::env().caller();
        let fee = Self::env().transferred_value();

        if let Some(pool_sale_info) = self.data::<data::Data>().pool_sale_info.get(&pool_type) {
            if !pool_sale_info.buy_status {
                return Err(Error::TokensCanNotPurchased);
            }
            if Self::env().block_timestamp() > pool_sale_info.end_time_buy {
                return Err(Error::CannotBuyAtThisTime);
            }
            if let Some(mut whitelist_info) = self
                .data::<data::Data>()
                .whitelist
                .get(&(&pool_type, &caller))
            {
                let decimal =
                    Psp22Ref::token_decimals(&self.data::<data::Data>().betaz_token_address);

                // price to buy amount of token
                let price = whitelist_info
                    .price
                    .checked_mul(amount)
                    .ok_or(Error::CheckedOperations)?
                    .checked_div(10_u128.pow(decimal as u32))
                    .ok_or(Error::CheckedOperations)?;

                if fee < price {
                    return Err(Error::InvalidFee);
                }
                let remaining_amount = whitelist_info
                    .amount
                    .checked_sub(whitelist_info.purchased_amount)
                    .unwrap();

                if amount > remaining_amount {
                    return Err(Error::NotEnoughBalance);
                }
                // Transfer token to caller
                let builder = Psp22Ref::transfer_builder(
                    &self.data::<data::Data>().betaz_token_address,
                    caller,
                    amount,
                    Vec::<u8>::new(),
                )
                .call_flags(CallFlags::default().set_allow_reentry(true));

                let transfer_result = match builder.try_invoke() {
                    Ok(Ok(Ok(_))) => Ok(()),
                    Ok(Ok(Err(e))) => Err(e.into()),
                    Ok(Err(ink::LangError::CouldNotReadInput)) => Ok(()),
                    Err(ink::env::Error::NotCallable) => Ok(()),
                    _ => Err(Error::CannotTransfer),
                };

                if transfer_result.is_ok() {
                    whitelist_info.purchased_amount =
                        whitelist_info.purchased_amount.checked_add(amount).unwrap();
                    self.data::<data::Data>()
                        .whitelist
                        .insert(&(&pool_type, &caller), &whitelist_info);
                    self._emit_whitelist_buy_event(
                        pool_type,
                        caller,
                        amount,
                        whitelist_info.purchased_amount,
                    )
                }
            } else {
                return Err(Error::WhitelistNotExists);
            }
        } else {
            return Err(Error::PoolNotExists);
        }

        Ok(())
    }

    // SET FUNCTIONS
    /// Set bet az token contract
    #[modifiers(only_owner)]
    fn set_betaz_token_address(&mut self, betaz_token_address: AccountId) -> Result<(), Error> {
        self.data::<data::Data>().betaz_token_address = betaz_token_address;
        Ok(())
    }

    /// update pool info
    #[modifiers(only_role(ADMINER))]
    fn update_sale_pool_info_pool_type(
        &mut self,
        pool_type: PoolType,
        buy_status: bool,
        end_time_buy: Timestamp,
        total_amount: Balance,
        total_purchased_amount: Balance,
        price: Balance,
    ) -> Result<(), Error> {
        if let Some(mut pool_sale_info) = self.data::<data::Data>().pool_sale_info.get(&pool_type) {
            let difference = pool_sale_info
                .total_amount
                .checked_sub(pool_sale_info.total_purchased_amount)
                .unwrap();

            // update buy_status
            if buy_status == pool_sale_info.buy_status {
                return Err(Error::InvalidBuyTokensStatus);
            }
            pool_sale_info.buy_status = buy_status;

            // update end_time_buy
            if end_time_buy < Self::env().block_timestamp() {
                return Err(Error::InvalidEndTime);
            }

            pool_sale_info.end_time_buy = end_time_buy;

            // update total_amount
            pool_sale_info.total_amount = total_amount;

            // update total_purchase_amount
            if total_purchased_amount < pool_sale_info.total_purchased_amount
                || total_purchased_amount > total_amount
            {
                return Err(Error::InvalidTotalPurchasedAmount);
            }

            pool_sale_info.total_purchased_amount = total_purchased_amount;

            // update price
            pool_sale_info.price = price;

            // mint || burn
            let new_difference = total_amount.checked_sub(total_purchased_amount).unwrap();
            if new_difference >= difference {
                let mint_amount: u128 = new_difference.checked_sub(difference).unwrap();
                if Psp22Ref::mint(
                    &self.data::<Data>().betaz_token_address,
                    Self::env().account_id(),
                    mint_amount,
                )
                .is_ok()
                {
                    self._emit_mint_token_event(Self::env().account_id(), mint_amount);
                } else {
                    return Err(Error::CannotMint);
                }
            } else {
                let burn_amount: u128 = difference.checked_sub(new_difference).unwrap();
                if Psp22Ref::burn(
                    &self.data::<Data>().betaz_token_address,
                    Self::env().account_id(),
                    burn_amount,
                )
                .is_ok()
                {
                    self._emit_burn_token_event(Self::env().account_id(), burn_amount);
                } else {
                    return Err(Error::CannotBurn);
                }
            }

            // update pool info
            self.data::<Data>()
                .pool_sale_info
                .insert(&pool_type, &pool_sale_info);
        } else {
            return Err(Error::PoolNotExists);
        }
        Ok(())
    }

    // GET FUCTIONS
    /// Get pool sale info
    fn get_pool_sale_info(&self, pool_type: PoolType) -> Option<PoolSaleInfo> {
        if let Some(pool_sale_info) = self.data::<Data>().pool_sale_info.get(&pool_type) {
            return Some(pool_sale_info);
        } else {
            return None;
        }
    }

    /// Get pool sale info total remaining amount
    fn get_pool_sale_total_remaining_amount(&self, pool_type: PoolType) -> Option<Balance> {
        if let Some(pool_sale_info) = self.data::<Data>().pool_sale_info.get(&pool_type) {
            return Some(
                pool_sale_info
                    .total_amount
                    .checked_sub(pool_sale_info.total_purchased_amount)
                    .unwrap(),
            );
        } else {
            return None;
        }
    }

    /// Get account in pool type
    fn get_account_by_pool_type(&self, pool_type: PoolType, index: u128) -> Option<AccountId> {
        if let Some(account) = self
            .data::<Data>()
            .whitelist_account
            .get_value(pool_type, &index)
        {
            return Some(account);
        } else {
            return None;
        }
    }

    /// Get total account in pool type
    fn get_total_account_by_pool_type(&self, pool_type: PoolType) -> u128 {
        self.data::<Data>().whitelist_account.count(pool_type)
    }

    /// Get whitelist Info
    fn get_whitelist_info(&self, pool_type: PoolType, account: AccountId) -> Option<WhitelistInfo> {
        if let Some(whitelist_info) = self.data::<Data>().whitelist.get(&(&pool_type, &account)) {
            return Some(whitelist_info);
        } else {
            return None;
        }
    }

    /// Get bet az token contract
    fn get_betaz_token_address(&self) -> AccountId {
        self.data::<data::Data>().betaz_token_address
    }
}
