use super::{RefGuard, TypeGuard, ValueGuard};
use crate::storage::RawMapping;
use core::marker::PhantomData;
use ink::{
    primitives::Key,
    storage::traits::{AutoKey, Packed, Storable, StorableHint, StorageKey},
};
use scale::{Error, Input, Output};

/// A mapping of one key to many values. The mapping provides iteration functionality over all
/// key's values.
pub struct MultiMapping<K, V, KeyType: StorageKey = AutoKey, TGK = RefGuard<K>, TGV = ValueGuard<V>>
{
    #[allow(clippy::type_complexity)]
    _marker: PhantomData<fn() -> (K, V, TGK, TGV, KeyType)>,
}

type ValueToIndex<'a, TGK, TGV> = &'a (
    <TGK as TypeGuard<'a>>::Type,
    &'a <TGV as TypeGuard<'a>>::Type,
);
type IndexToValue<'a, TGK> = &'a (<TGK as TypeGuard<'a>>::Type, &'a u128);

impl<K, V, TGK, TGV, KeyType> MultiMapping<K, V, KeyType, TGK, TGV>
where
    KeyType: StorageKey,
{
    #[allow(dead_code)]
    fn new() -> Self {
        Self {
            _marker: Default::default(),
        }
    }

    /// Contains count of values by key.
    /// key_count: Mapping<K, u128>,
    fn key_count(&self) -> RawMapping<<TGK as TypeGuard>::Type, u128, (&Key, &u32)>
    where
        for<'a> TGK: TypeGuard<'a>,
    {
        RawMapping::new((&KeyType::KEY, &0))
    }

    /// Mapping from key's value to local index.
    /// value_to_index: Mapping<(K, V), u128>,
    fn value_to_index(&self) -> RawMapping<ValueToIndex<TGK, TGV>, u128, (&Key, &u32)>
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
    {
        RawMapping::new((&KeyType::KEY, &1))
    }

    /// Mapping from local key's index to value.
    /// index_to_value: Mapping<(K, u128), V>,
    fn index_to_value(
        &self,
    ) -> RawMapping<IndexToValue<TGK>, <TGV as TypeGuard>::Type, (&Key, &u32)>
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
    {
        RawMapping::new((&KeyType::KEY, &2))
    }
}

impl<K, V, TGK, TGV, KeyType> Default for MultiMapping<K, V, KeyType, TGK, TGV>
where
    KeyType: StorageKey,
{
    fn default() -> Self {
        Self {
            _marker: Default::default(),
        }
    }
}

impl<K, V, TGK, TGV, KeyType> core::fmt::Debug for MultiMapping<K, V, KeyType, TGK, TGV>
where
    KeyType: StorageKey,
{
    fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
        f.debug_struct("MultiMapping")
            .field("key", &KeyType::KEY)
            .finish()
    }
}

impl<K, V, TGK, TGV, KeyType> MultiMapping<K, V, KeyType, TGK, TGV>
where
    K: Packed,
    V: Packed,
    KeyType: StorageKey,
{
    /// Insert the given `value` to the contract storage at `key`.
    pub fn insert<'b>(
        &'b mut self,
        key: <TGK as TypeGuard<'b>>::Type,
        value: &<TGV as TypeGuard<'b>>::Type,
    ) where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode + Copy,
        for<'a> <TGV as TypeGuard<'a>>::Type: Packed,
    {
        let index: u128 = match self.get_index(key, value) {
            None => {
                let count = self.count(key);
                self.key_count().insert(key, &(count + 1));
                count
            }
            Some(index) => index,
        };
        self.value_to_index().insert(&(key, value), &index);
        self.index_to_value().insert(&(key, &index), value)
    }

    /// Returns the count of values stored under the `key`.
    #[inline]
    pub fn count<'b>(&'b self, key: <TGK as TypeGuard<'b>>::Type) -> u128
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode,
    {
        self.key_count().get(key).unwrap_or_default()
    }

    /// Get the `value` at (`key`, `index`) from the contract storage.
    ///
    /// Returns `None` if no `value` exists at the given (`key`, `index`).
    #[inline]
    pub fn get_value<'b>(&self, key: <TGK as TypeGuard<'b>>::Type, index: &u128) -> Option<V>
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode + Copy,
    {
        RawMapping::<IndexToValue<TGK>, V, _>::new((&KeyType::KEY, &2)).get(&(key, index))
    }

    /// Get the `index` of (`key`, `value`) from the contract storage.
    ///
    /// Returns `None` if no `value` exists for the given `key`.
    #[inline]
    pub fn get_index<'b>(
        &self,
        key: <TGK as TypeGuard<'b>>::Type,
        value: &<TGV as TypeGuard<'b>>::Type,
    ) -> Option<u128>
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode + Copy,
        for<'a> <TGV as TypeGuard<'a>>::Type: Packed,
    {
        RawMapping::<ValueToIndex<TGK, TGV>, u128, _>::new((&KeyType::KEY, &1)).get(&(key, value))
    }

    /// Get the size of a value stored at (`key`, `value`) in the contract storage.
    ///
    /// Returns `None` if no `value` exists at the given (`key`, `value`).
    #[inline]
    pub fn size_value<'b>(
        &'b self,
        key: <TGK as TypeGuard<'b>>::Type,
        value: &<TGV as TypeGuard<'b>>::Type,
    ) -> Option<u32>
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode + Copy,
        for<'a> <TGV as TypeGuard<'a>>::Type: Packed,
    {
        if let Some(index) = self.get_index(key, value) {
            self.index_to_value().size(&(key, &index))
        } else {
            None
        }
    }

    /// Get the size of a value stored at (`key`, `index`) in the contract storage.
    ///
    /// Returns `None` if no `value` exists at the given (`key`, `index`).
    #[inline]
    pub fn size_index<'b>(&'b self, key: <TGK as TypeGuard<'b>>::Type, index: &u128) -> Option<u32>
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode,
        for<'a> <TGV as TypeGuard<'a>>::Type: Packed,
    {
        self.index_to_value().size(&(key, index))
    }

    /// Checks if any value is stored at the given `key` in the contract storage.
    #[inline]
    pub fn contains<'b>(&'b self, key: <TGK as TypeGuard<'b>>::Type) -> bool
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode,
    {
        self.count(key) > 0
    }

    /// Checks if the `value` is stored at the given `key` in the contract storage.
    #[inline]
    pub fn contains_value<'b>(
        &'b self,
        key: <TGK as TypeGuard<'b>>::Type,
        value: &<TGV as TypeGuard<'b>>::Type,
    ) -> bool
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode,
        for<'a> <TGV as TypeGuard<'a>>::Type: Packed,
    {
        self.value_to_index().contains(&(key, value))
    }

    /// Checks if any value is stored at the given (`key`, `index`) in the contract storage.
    #[inline]
    pub fn contains_index<'b>(&'b self, key: <TGK as TypeGuard<'b>>::Type, index: &u128) -> bool
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode,
        for<'a> <TGV as TypeGuard<'a>>::Type: Packed,
    {
        self.index_to_value().contains(&(key, index))
    }

    /// Clears the `value` at `key` from storage.
    pub fn remove_value<'b>(
        &'b mut self,
        key: <TGK as TypeGuard<'b>>::Type,
        value: &<TGV as TypeGuard<'b>>::Type,
    ) where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode + Copy,
        for<'a> <TGV as TypeGuard<'a>>::Type: Packed + From<V>,
    {
        let op_index = self.get_index(key, value);

        let index;
        if let Some(op_index) = op_index {
            index = op_index;
        } else {
            return;
        }
        let index = &index;
        self.swap_and_remove(key, value, index);
    }

    /// Clears the value at (`key`, `index`) from storage.
    pub fn remove_index<'b>(&'b mut self, key: <TGK as TypeGuard<'b>>::Type, index: &u128)
    where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode + Copy,
        for<'a> <TGV as TypeGuard<'a>>::Type: Packed + From<V>,
    {
        let op_value = self.get_value(key, index);

        let value;
        if let Some(op_value) = op_value {
            value = op_value;
        } else {
            return;
        }
        self.swap_and_remove(key, &value.into(), index);
    }

    fn swap_and_remove<'b>(
        &'b mut self,
        key: <TGK as TypeGuard<'b>>::Type,
        value: &<TGV as TypeGuard<'b>>::Type,
        index: &u128,
    ) where
        for<'a> TGK: TypeGuard<'a>,
        for<'a> TGV: TypeGuard<'a>,
        for<'a> <TGK as TypeGuard<'a>>::Type: scale::Encode + Copy,
        for<'a> <TGV as TypeGuard<'a>>::Type: Packed + From<V>,
    {
        let last_index = &(self.count(key) - 1);

        if last_index != index {
            let last_value = &self
                .get_value(key, last_index)
                .expect("The value under the last index should exist")
                .into();
            self.index_to_value().insert(&(key, index), last_value);
            self.value_to_index().insert(&(key, last_value), index);
        }

        self.index_to_value().remove(&(key, last_index));
        self.value_to_index().remove(&(key, value));
        self.key_count().insert(key, last_index);
    }
}

#[cfg(feature = "std")]
const _: () = {
    use ink::{
        metadata::layout::{Layout, LayoutKey, RootLayout},
        storage::traits::StorageLayout,
    };
    use scale_info::{build::Fields, type_params, Path, Type, TypeInfo};

    impl<K, V, TGK, TGV, KeyType> TypeInfo for MultiMapping<K, V, KeyType, TGK, TGV>
    where
        K: TypeInfo + 'static,
        V: TypeInfo + 'static,
        KeyType: StorageKey + 'static,
        TGK: 'static,
        TGV: 'static,
    {
        type Identity = Self;

        fn type_info() -> Type {
            Type::builder()
                .path(Path::new("MultiMapping", module_path!()))
                .type_params(type_params![K, V])
                .composite(Fields::unnamed().field(|f| f.ty::<[(K, V)]>()))
        }
    }

    impl<K, V, TGK, TGV, KeyType> StorageLayout for MultiMapping<K, V, KeyType, TGK, TGV>
    where
        K: scale_info::TypeInfo + 'static,
        V: Packed + StorageLayout + scale_info::TypeInfo + 'static,
        KeyType: StorageKey + 'static,
        TGK: 'static,
        TGV: 'static,
    {
        fn layout(_: &Key) -> Layout {
            Layout::Root(RootLayout::new(
                LayoutKey::from(&KeyType::KEY),
                <V as StorageLayout>::layout(&KeyType::KEY),
            ))
        }
    }
};

impl<K, V, TGK, TGV, KeyType> Storable for MultiMapping<K, V, KeyType, TGK, TGV>
where
    V: Packed,
    KeyType: StorageKey,
{
    #[inline]
    fn encode<T: Output + ?Sized>(&self, _dest: &mut T) {}

    #[inline]
    fn decode<I: Input>(_input: &mut I) -> Result<Self, Error> {
        Ok(Default::default())
    }
}

impl<K, V, Key, InnerKey, TGK, TGV> StorableHint<Key> for MultiMapping<K, V, InnerKey, TGK, TGV>
where
    V: Packed,
    Key: StorageKey,
    InnerKey: StorageKey,
{
    type Type = MultiMapping<K, V, Key, TGK, TGV>;
    type PreferredKey = InnerKey;
}

impl<K, V, TGK, TGV, KeyType> StorageKey for MultiMapping<K, V, KeyType, TGK, TGV>
where
    V: Packed,
    KeyType: StorageKey,
{
    const KEY: Key = KeyType::KEY;
}
