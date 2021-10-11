use rand::Rng;
// [🧑‍🏫] import { io } from 'std'
use std::cmp::Ordering;
use std::io;

// !🦀
fn main() {
    let secret_number = rand::thread_rng().gen_range(1..=25);
    // [🧑‍🏫] const crab = 0
    let _crab = 0; // immutable
    // [🧑‍🏫] let crab = string.new()
    let mut crab = String::new(); // mutable

    println!("what's age of this crab?");

    // '&'means refrence
    io::stdin().read_line(&mut crab).expect("utf-8");

    let crab: u32 = crab.trim().parse().expect("number"); // shadowing

    match crab.cmp(&secret_number) {
        Ordering::Less => println!("older"),
        Ordering::Equal => println!(" "),
        Ordering::Greater => println!("younger"),
    }

    // [🧑‍🏫] console.log('%s', crab)
    println!("crab is {}.", secret_number);
}
