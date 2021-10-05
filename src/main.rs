// [🧑‍🏫] import { io } from 'std'
use std::io;

// !🦀
fn main() {
    // [🧑‍🏫] const crab = 0
    let _crab = 0; // immutable
    // [🧑‍🏫] let crab = string.new()
    let mut crab = String::new(); // mutable

    println!("what's name of this crab?");

    // '&'means refrence
    io::stdin().read_line(&mut crab).expect("utf-8");

    // [🧑‍🏫] console.log('%s', crab)
    println!("crab is {}.", crab);
}
