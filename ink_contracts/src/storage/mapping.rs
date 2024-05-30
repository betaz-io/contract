use super::{
    RawMapping,
    TypeGuard,
    ValueGuard,
};
use core::marker::PhantomData;

use crate::storage::RefGuard;
use ink::{
    primitives::Key,
    storage::traits::{
        AutoKey,
        Packed,
        Storable,
        StorableHint,
        StorageKey,
    },
};
use scale::{
    Error,
    Input,
    Output,
};

/// It is a more restricted version of the `Mapping` from ink!. That mapping can be used to unify
/// the API calls to the `Mapping` to avoid monomorphization to reduce the size of contracts.
/// It verifies that all calls are done with the same type during compilation.
pub struct Mapping<K, V, KeyType: StorageKey = AutoKey, TGK = RefGuard<K>, TGV = ValueGuard<V>> {
    #[allow(clippy::type_complexity)]
    _marker: PhantomData<fn() -> (K, V, KeyType, TGK, TGV)>,
}

/// We implement this manually because the derived implementation adds trait bounds.
impl<K, V, KeyType, TGK, TGV> Default for Mapping<K, V, KeyType, TGK, TGV>
where
    V: Packed,
    KeyType: StorageKey,
{
    fn default() -> Self {
        Self {
            _marker: Default::default(),
        }
    }
}

impl<K, V, KeyType, TGK, TGV> core::fmt::Debug for Mapping<K, V, KeyType, TGK, TGV>
where
    V: Packed,
    KeyType: StorageKey,
{
    fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
        f.debug_struct("Mapping").field("key", &KeyType::KEY).finish()
    }
}

impl<K, V, KeyType, TGK, TGV> Mapping<K, V, KeyType, TGK, TGV>
where
    KeyType: StorageKey,
{
    /// Creates a new empty `Mapping`.
    #[allow(dead_code)]
    fn new() -> Self {
        Self {
            _marker: Default::default(),
        }
    }
}

impl<K, V, KeyType, TGK, TGV> Mapping<K, V, KeyType, TGK, TGV>
where
    K: Packed,
    V: Packed,
    KeyType: StorageKey,
{
    /// Insert the given `value` to the contract storage.
    #[inline]
    pub fn insert<'a, 'b>(&mut self, key: TGK::Type, value: &TGV::Type)
    where
        TGK: TypeGuard<'a>,
        TGV: TypeGuard<'b>,
        TGK::Type: scale::Encode,
        TGV::Type: Packed,
    {
        RawMapping::<TGK::Type, TGV::Type, &Key>::new(&KeyType::KEY).insert(key, value)
    }

    /// Get the `value` at `key` from the contract storage.
    ///
    /// Returns `None` if no `value` exists at the given `key`.
    #[inline]
    pub fn get<'a>(&self, key: TGK::Type) -> Option<V>
    where
        TGK: TypeGuard<'a>,
        TGK::Type: scale::Encode,
    {
        RawMapping::<TGK::Type, V, &Key>::new(&KeyType::KEY).get(key)
    }

    /// Get the size of a value stored at `key` in the contract storage.
    ///
    /// Returns `None` if no `value` exists at the given `key`.
    #[inline]
    pub fn size<'a>(&self, key: TGK::Type) -> Option<u32>
    where
        TGK: TypeGuard<'a>,
        TGK::Type: scale::Encode,
    {
        RawMapping::<TGK::Type, (), &Key>::new(&KeyType::KEY).size(key)
    }

    /// Checks if a value is stored at the given `key` in the contract storage.
    ///
    /// Returns `None` if no `value` exists at the given `key`.
    #[inline]
    pub fn contains<'a>(&self, key: TGK::Type) -> bool
    where
        TGK: TypeGuard<'a>,
        TGK::Type: scale::Encode,
    {
        RawMapping::<TGK::Type, (), &Key>::new(&KeyType::KEY).contains(key)
    }

    /// Clears the value at `key` from storage.
    pub fn remove<'a>(&self, key: TGK::Type)
    where
        TGK: TypeGuard<'a>,
        TGK::Type: scale::Encode,
    {
        RawMapping::<TGK::Type, V, &Key>::new(&KeyType::KEY).remove(key)
    }
}

impl<K, V, KeyType, TGK, TGV> Storable for Mapping<K, V, KeyType, TGK, TGV>
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

impl<K, V, Key, TGK, TGV, InnerKey> StorableHint<Key> for Mapping<K, V, InnerKey, TGK, TGV>
where
    V: Packed,
    Key: StorageKey,
    InnerKey: StorageKey,
{
    type Type = Mapping<K, V, Key, TGK, TGV>;
    type PreferredKey = InnerKey;
}

impl<K, V, TGK, TGV, KeyType> StorageKey for Mapping<K, V, KeyType, TGK, TGV>
where
    V: Packed,
    KeyType: StorageKey,
{
    const KEY: Key = KeyType::KEY;
}

#[cfg(feature = "std")]
const _: () = {
    use ink::{
        metadata::layout::{
            Layout,
            LayoutKey,
            RootLayout,
        },
        storage::traits::StorageLayout,
    };
    use scale_info::{
        build::Fields,
        type_params,
        Path,
        Type,
        TypeInfo,
    };

    impl<K, V, KeyType, TGK, TGV> TypeInfo for Mapping<K, V, KeyType, TGK, TGV>
    where
        K: TypeInfo + 'static,
        V: TypeInfo + 'static,
        TGK: 'static,
        TGV: 'static,
        KeyType: StorageKey + 'static,
    {
        type Identity = Self;

        fn type_info() -> Type {
            Type::builder()
                .path(Path::new("Mapping", module_path!()))
                .type_params(type_params![K, V])
                .composite(Fields::unnamed().field(|f| f.ty::<[(K, V)]>()))
        }
    }

    impl<K, V, KeyType, TGK, TGV> StorageLayout for Mapping<K, V, KeyType, TGK, TGV>
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

#[cfg(test)]
mod tests {
    use super::*;
    #[ink::test]
    fn insert_and_get_work() {
        let mut mapping: Mapping<u128, u128> = Mapping::default();

        mapping.insert(&1, &1);
        mapping.insert(&2, &2);

        assert_eq!(mapping.get(&1), Some(1));
        assert_eq!(mapping.get(&2), Some(2));
        assert_eq!(mapping.get(&3), None);
    }

    #[ink::test]
    fn remove_and_contains_works() {
        let mut mapping: Mapping<u128, u128> = Mapping::default();

        mapping.insert(&1, &1);
        mapping.insert(&2, &2);

        assert_eq!(mapping.contains(&1), true);
        assert_eq!(mapping.contains(&2), true);

        mapping.remove(&1);

        assert_eq!(mapping.contains(&1), false);
        assert_eq!(mapping.contains(&2), true);
    }
}