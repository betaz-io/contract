pub use crate::traits::errors::PausableError;

#[ink::storage_item]
#[derive(Debug, Default)]
pub struct PausableData {
    pub paused: bool,
}

impl PausableData {
    pub fn _paused(&self) -> bool {
        self.paused
    }

    pub fn _pause(&mut self) -> Result<(), PausableError> {
        self.paused = true;
        Ok(())
    }
    pub fn _unpause(&mut self) -> Result<(), PausableError> {
        self.paused = false;
        Ok(())
    }

    pub fn _switch_pause(&mut self) -> Result<(), PausableError> {
        if self._paused() {
            self._unpause()
        } else {
            self._pause()
        }
    }
}
