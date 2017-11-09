'use strict'

const loop = require('../index')
const END_LOOP = loop.END_LOOP
const repeat = require('repeat-element')
const expect = require('chai').expect

const array = [1, 2, 3, 4, 5, 6, 7]
const object = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7}

describe('Loop asynchronous over objects and array', function () {
  it('Should loop over all array items.', function (done) {
    let counter = 0
    loop(array, (item, next) => {
      setTimeout(() => {
        counter++
        next()
      }, 0)
    }, errors => {
      expect(errors).to.be.null
      expect(counter).to.be.equals(array.length)
      done()
    })
  })

  it('Should loop over an array.', function (done) {
    loop(array, (item, next) => {
      setTimeout(() => {
        expect(item).to.be.a('number')
        next()
      }, 0)
    }, errors => {
      expect(errors).to.be.null
      done()
    })
  })

  it('Should loop over an object.', function (done) {
    loop(object, (item, next) => {
      setTimeout(() => {
        expect(item.value).to.be.a('number')
        expect(item.key).to.be.a('string')
        next()
      }, 0)
    }, errors => {
      expect(errors).to.be.null
      done()
    })
  })

  it('Should call stop at 5th element.', function (done) {
    const limit = 5
    let counter = 0
    loop(object, (item, next) => {
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
  })

  it('Should have n error elements.', function (done) {
    loop(array, (item, next) => {
      next(new Error())
    }, errors => {
      expect(errors).to.have.lengthOf(array.length)
      done()
    })
  })

  it('Should loop over 1 million items successfully.', function (done) {
    const numItems = 1e6
    const oneMillionItems = repeat(31, numItems)
    loop(oneMillionItems,
      (item, next) => next()
      , errors => {
        expect(errors).to.be.null
        done()
      })
  })
})
