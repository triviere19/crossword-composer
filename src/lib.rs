mod dictionary;
mod grid;
mod index;
mod solver;

// use napi::bindgen_prelude::*;
use napi_derive::napi;
use crate::dictionary::Dictionary;
extern crate console_error_panic_hook;

#[napi]
pub struct Solver {
    dict: Dictionary,
}

#[napi]
impl Solver {

    #[napi(constructor)]
    pub fn new(words: Vec<String>) -> Solver {
        let dict = Dictionary::from_vec(words);
        Solver { dict }
    }

    #[napi]
    pub fn solve(&self, spec_arr: Vec<Vec<u32>>) -> Option<Vec<String>> {
        let spec: Vec<Vec<usize>> = spec_arr
        .into_iter()
        .map(|row: Vec<u32>| row.into_iter().map(|n| n as usize).collect())
        .collect();

        let grid = grid::Grid::new(spec);

        let result = solver::solve(&grid, &self.dict);

        result.map(|r| r.iter().map(|c| c.to_string()).collect())
    }
}
