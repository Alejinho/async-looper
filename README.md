# async-looper

[![NPM version][npm-badge]](https://www.npmjs.com/package/async-looper)
[![NPM downloads][npm-d-badge]](https://www.npmjs.com/package/async-looper)
[![Build Status][travis-badge]](https://travis-ci.org/Alejinho/async-looper)

Fast, flexible and simple function that loops through 
each **array** or **object** element to execute 
asynchronous code.

## Usage

This function expect four parameters:
1. Element to loop through
2. Function to execute each time
3. Function to execute when loop finish.
4. Number of times needed to execute `nextTick`  

```javascript 1.8
const loop = require('async-looper')

let counter = 0
let array = [1, 2, 3, 4, 5]

loop(array, (item, next) => {
  // First time
  // item = 1
  counter++
  next()
}, errors => {
  expect(counter).to.be.equals(array.length)
  done()
})
```

It can loop over objects.

```javascript 1.8
const loop = require('async-looper')

let object = {a: 1, b: 2, c: 3, d: 4}
let newValueToA = 100;

loop(object, (item, next) => {
  // First time
  // item = {
  //  value: 1,
  //  key: 'a'
  // }
  if (item.key === 'a') {
    object[item.key] = newValueToA
  }
  next()
}, errors => {
  expect(object.a).to.be.equal(newValue)
  done()
})
```

If you need you can stop the loop just passing
a second param to the next function.

```javascript 1.8
const loop = require('async-looper')
const END_LOOP = loop.END_LOOP

const limit = 5
let counter = 0
let array = [1, 2, 3, 4, 5, 6]

loop(array, (item, next) => {
  counter++
  if (counter === limit) {
    next(null, END_LOOP)
  } else {
    next()
  }
}, errors => {
  expect(counter).to.be.equal(limit)
  done()
})
```

The finish callback has an array of errors or 
it's null

```javascript 1.8
const loop = require('async-looper')

let array = [1, 2, 3, 4, 5, 6]

loop(array, (item, next) => {
  next(new Error())
}, errors => {
  expect(errors).to.have.lengthOf(array.length)
  done()
})
```

## TODO
1. Improve the documentation.
2. Benchmarks.
3. Should we have the key value while loop through 
an array?

[npm-badge]: https://img.shields.io/npm/v/async-looper.svg
[npm-d-badge]: https://img.shields.io/npm/dt/async-looper.svg
[travis-badge]: https://img.shields.io/travis/Alejinho/async-looper.svg