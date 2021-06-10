const course0 = `
# CS50 React Native

> Jordan Hayashi, 2018

Javascript is interpreted, means it will execute code line by line. 

Each browser has built-in javascript engine, it will do some magic and just-in-time compilation.

- V8
  - Node.js(a command line javascript runtime)
  - Chrome
- SpiderMonkey
  - Firefox
- JavascriptCore
  - Safari
- Chakra
  - Microsoft Edge/IE

They each implement the ECMA(European Computer Manufactures Association)Script standard.

But may differ for anything not defined by the standard.

## Types

- Dynamic typing
- Primitive types(no methods, immutoc)
  - undefined
  - null
  - boolean
  - number
  - string
  - (symbol)
- Objects
- Coercion Typecasting
  - explicit
  - implicit
  - == vs. ===
    - == coerces the types
    - === requires equivalent types
  - typeof
    - typeof null is object(if change the whole internet would break)
  - falsy values
    - undefined
    - null
    - false
    - +0, -0, NaN
    - ""
  - truthy values
    - {}
    - []
    - Everthing else 

\`\`\`js
const x = 26
const explicit = String(x)
const implicit = x + ''
\`\`\`

## Objects

If it's not one of those primitive values, it's an object. 

- Primitives vs. Objects
  - Primitives are immutable
  - Objects are mutable and stored by reference

\`\`\`js
const o = new Object()
const o2 = {} // preferred way

const o3 = { 1: 'test' } // 1 will cast to string
o3['1'] // 'test'
o3[1] // anything between the brackets will get coerced into string

const o4 = Object.assign({}, o3) // shallow copy

// deep copy
function deepCopy(obj) {
  const keys = Object.keys(obj);
  const newObj = {};
  
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    
    if(typeof obj[key] == 'object') {
      newObj[key] = deepCopy(obj[key]);
    }
    else newObj[key] = obj[key];
  }
  
  return newObj;
}
\`\`\`

## Prototypal Inheritance

- Non-primitive types have a few properties/methods associated with them
- Each object stores a reference to its prototype
- Properties/methods defined most tightly to the instance have priority
- Most primitive types have object wrappers
- JS will automatically "box"(wrap) primitive values so you have access to methods
- Recommend against changing prototype

\`\`\`js
const arr = []

arr.__proto__ // array prototype
arr.__proto__.__proto__ // object prototype

26.__proto__ // error!
const num = 26
num.__proto__ // [Number: 0]
num instanceof Number // false
\`\`\`

## Scope

- Variable lifetime(how long these variables actually exist)
  - Lexical scoping(var): from when they're declared until when their function ends
  - Block scoping(let, const): util the next } is reached
- Hoisting
  - Function definitions are hoisted, but not lexically-scoped initializations

\`\`\`js
thisIsHoisted() // Hi!
console.log(a) // undefined -> hoisting take the definition of something and hoist to the very top of the file and does that first
console.log(o) // error! -> block scoping variable is declared at the line that it is written
const o = {}
o = {} // error!

var a = 'a'
var a = 'b' // shadowing
console.log(a) // 'b'
// let a = 'a' // error!

function thisIsHoisted() {
  console.log('Hi!')
}
\`\`\`

## The Javascript Engine

- Before executing the code, the engine reads the entire file and will throw a syntax error if one is not found
  - Any function definitions will be saved in memory
  - Variale initializations will be run, but lexically-scoped variable names will be declared
- Execution phase whereby the code is actually run, it's when things like const or let get invoked, or get both declared and initialized

## The Global Object

- All variables and functions are actually keys or parameters and methods on the global object
  - Browser global object is the 'window' object
  - Node.js global object is the 'global' object

\`\`\`js
var x = 'x'
window.x // 'x'

const y = 'y'
window.y // undefined
\`\`\`

## Closures

- Functions that refer to variables declared by parent function still have access to those variables
- Possible because of scoping

\`\`\`js
// closure weired thing
function makeArray() {
  const arr = []

  for (var i = 0; i < 5; i++) {
    arr.push(function () {
      console.log(i)
    })
  }

  console.log(i) // 5
  return arr
}
const arr = makeArray()
arr[0]() // 5

function makeHelloFunction() {
  const message = 'Hello!'

  function sayHello() {
    console.log(message)
  }

  return sayHello
}
// console.log(message) // error!
console.log('typeof message:', typeof message) // typeof message: undefined
const sayHello = makeHelloFunction()
console.log(sayHello.toString())
sayHello() // Hello!
\`\`\`

## IIFE (Immediately Invoked Function Expression)

- A function expression that gets invoked immediately
- Creates closure
- Doesn't add to or modify global object

\`\`\`js
// create same closure without actually creating a globally scoped function is an IIFE
const sayHello = (function () {
  const message = 'Hello!'

  function sayHello() {
    console.log(message)
  }

  return sayHello
})()
sayHello() // Hello!

// use case
const counter = (function () {
  let count = 0 // can't access count variable

  return {
    inc: function () { count += 1 },
    get: function () { console.log(count) }
  }
})()

// use IIFE to solve buggy
function makeArray() {
  const arr = []

  for (var i = 0; i < 5; i++) {
    arr.push((function (x) {
      return function () { console.log(x) }
    })(i))
  }

  return arr
}
const arr = makeArray()
arr[0]() // 0
\`\`\`

## First-Class Functions

- Functions are treated the same way as other value
  - Can be assigned to variables, array values, obejct values
  - Can be passed as arguments to other functions
  - Can be returned from functions
- Allows for the creation of higher-order functions
  - Either takes one or more functions as arguments or returns a function
  - map(), filter(), reduce()

\`\`\`js
const arr = ['0', 1, 2]
function add(a, b) { return a + b }
console.log(arr.reduce(add)) // '012'
console.log(arr.reduce(add, 'from ')) // 'from 012'
\`\`\`
`

const content = document.getElementById('content')
content.innerHTML = marked(course0)

const mode = document.querySelector('.btn-mode')
mode.addEventListener('click', () => {
  const iconMap = {
    0: '😺',
    1: '🐶',
  }
  const textMap = ['dark', 'light']
  const colorPalette = {
    0: ['#30475e', '#ececec', '#00203f', '#f2a365'],
    1: ['#f9fcfb', '#333333', '#f3f9fb', '#2978b5'],
  }

  const cur = textMap.findIndex((ele) => ele === mode.dataset.mode)
  mode.textContent = iconMap[cur]
  const tmp = 1 - cur
  mode.dataset.mode = textMap[tmp]

  document.documentElement.style.setProperty(
    '--background-color',
    colorPalette[tmp][0]
  )
  document.documentElement.style.setProperty(
    '--font-color',
    colorPalette[tmp][1]
  )
  document.documentElement.style.setProperty(
    '--pre-color',
    colorPalette[tmp][2]
  )
  document.documentElement.style.setProperty(
    '--primary-color',
    colorPalette[tmp][3]
  )
})

const toc = document.querySelector('ol')
toc.addEventListener('click', (e) => {
  if (e.target.nodeName === 'LI') {
    const selected = document.querySelector('[data-selected="1"]')
    selected.removeAttribute('data-selected')

    e.target.dataset.selected = 1
  }
})
