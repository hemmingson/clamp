const course = `
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

## Synchronous, Async, Single-Threaded

- JavaScript is a single-threaded, synchronous language
- A function that takes a long time to run will cause a page to become unresponsive
- JavaScript has function that act asynchronously
- It can be both synchronous and asynchronous

\`\`\`js
function hang(secs) {
  const doneAt = Date.now() + secs * 1000
  while(Date.now() < doneAt) {}
}
hang(10) // stuck for 10s
\`\`\`

## Asynchronous JavaScript

- Asynchronouse functions
  - setTimeout()
  - XMLHttpRequest(), jQuery.ajax(), fetch()
  - Database calls
- Execution stack
  - Functions invoked by other functions get added to the call stack
  - When functions complete, they are removed from the stack and the frame below continues executing
- Browser APIs
  - Functions that are not built into javascript, but might get run in the browser
- Function queue
- Event loop
  - First checking is there anything in the stack
  - If stack is empty, check is there anything in the queue that's ready to go onto the stack

\`\`\`js
function print(num) {
  console.log(num)
}
// result: 2 1 0
setTimeout(function () { print(0) }, 2000)
setTimeout(function () { print(1) }, 0)
print(2)
\`\`\`

## Callbacks

- Control flow with asynchronous calls
- Execute function once asynchronous call returns value
  - Program doesn't have to halt and wait for value

## Promises

- Alleviate "callback hell"
- Allows you to write code that assumes a value is returned within a success function
- Only needs a single error handler

\`\`\`js
const url = ''
fetch(url) // returns a promise
  .then(function (res) {
    return res.json() // extract the json out of this result
  })
  .then(function (json) {
    return {
      importantData: json.importantData,
    }
  })
  .then(function (data) {
    console.log(data)
  })
  .catch(function (err) {
    // handle error here
  })
\`\`\`

## Async/Await

- Introduced in ES2017
- Allows people to write async code as if it were synchronous
- Mostly inside try-catch block

## this

- Refers to an object that's set at the creation of a new execution context(function invocation)
- In the global execution contect, refers to global object
- If the function is called as a method of an object, 'this' is bound to the object the method is called on
  - It's kind of a way of using a value that we don't yet know what it's going to be until we go ahead and invoke that function

\`\`\`js
// node REPL
this // global object
// chrome console
this // window object

const person = {
  name: 'hem',
  greet: function () {
    console.log(this.name)
  },
}
person.greet() // 'hem'
const greet = person.greet
greet() // undefined
const friend = {
  name: 'david',
}
friend.greet = person.greet
friend.greet() // 'david'
\`\`\`

## Setting 'this' manually

- bind(), call(), apply()
  - Difference between bind and call and apply is that call and apply rather than returning a new function, call and apply will IIFE
- ES6 arrow notation
  - Will actually bind 'this' to be whatever 'this' is at the time that function is declared, rather than at the time that function is invoked

\`\`\`js
const person = {
  name: 'hem',
  greet: function () {
    console.log(this.name)
  },
}
const greet = person.greet.bind({ name: 'bound object' }) // explicitly bound this in this particular function to be this particular object
greet() // 'bound object'
// person.greet.call({ name: 'bound object' })
// person.greet.apply({ name: 'bound object' })
\`\`\`

## Browsers and the DOM

- Browsers render HTML to a webpage
- HTML: defines a tree-like structure
- Browsers construct this tree in memory before painting the page
- Tree is called the Document Object Model
- The DOM can be modified using JavaScript

## Classes

- Syntax introduced in ES6
- Simplifies the definition of complex objects with their own prototypes
- Classes vs instances
- Methods vs static methods vs properties
- new, constructor, extends, super
  - constructor method in order to go ahead and construct an instance of this class

\`\`\`js
class MySet extends Set {
  constructor(arr = []) {
    super(arr) // run original set's constructor
    this.originalArray = arr
  }

  add(val) {
    super.add(val) // super refers to the class is extended
    console.log('added ' + val + ' to the set!')
  }

  toArray() {
    return Array.from(this) // pass in entire instance
  }

  reset() {
    return new MySet(this.originalArray)
  }
}
\`\`\`

## React

- Allows us to write declarative views that __react__ to change data automatically
- Allows us to abstract complex problems into small components
- Allows us to write simple code that is still performant

## Imperative vs Declarative

- How vs What
  - How you do something and actually what you want out of it
- Imperative programming outlines a series of steps to get to what you want
- Declarative programming just declares what you want

## React is Declarative

- Imperative vs Declarative
- The browser APIs aren't fun to work with
- React allows us to write what we want, and the library will take care of the DOM manipulation

## React is Easily Componentized

- Breaking a complex problem into discrete components
- Can reuse these components
  - Consistency
  - Iteration speed
- React's declarative nature makes it easy to customize components

## React is Performant

- We write what we want and React will do the hard work
- Reconciliation - the process by which React syncs changes in app state to the DOM
  - Reconstructs the virtual DOM
  - Diffs the virtual DOM against the real DOM

## Writing React

- JSX
  - XML-like syntax extension of JavaScript
  - Transpiles to JavaScript
  - Lowercase tags are treated as HTML/SVG tags, uppercase are treated as custom components
- Components are just functions
  - Returns a node (something React can render, e.g. a \\<div \\/\\>)
  - Receives an object of the properties that are passed to the element
- Props
  - Passed as an object to a component and used to compute the returned node
  - Changes in these props will cause a recomputation of the returned node ("re-render")
  - Unlike in HTML, these can be any JS value
`

const content = document.getElementById('content')
content.innerHTML = marked(course)

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
