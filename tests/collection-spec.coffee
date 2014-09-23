"use strict"
expect = require("expect.js")
LocalDB = require("../src/localdb.js")
Collection = require("../src/lib/collection.js")
Utils = require('../src/lib/utils.js')


db = new LocalDB("foo")

describe "Collection", ->
    bar = db.collection("bar")
    it "Init", ->
        expect(bar instanceof Collection).to.be(true)
    it "Insert", ->
        bar.insert {
            a: 1,
            b: "abc",
            c: /hell.*ld/,
            d: {e: 4, f: "5"},
            g: (h) -> return h * 3
            i: [1,2,3]
        }
        data = bar.find()[0]
        expect(data.a).to.be(1)
        expect(data.b).to.be("abc")
        expect(data.c.test("hello world")).to.be(true)
        expect(data.d).to.be.eql({e:4, f: "5"})
        expect(Utils.isFunction(data.g)).to.be(true)
        expect(data.g(100)).to.be(300)
        expect(data.i).to.be.eql([1,2,3])
    it "Insert List", ->
        bar.drop()
        bar.insert [
            {
                a:1,
                b:2,
                c:3
            },
            {
                a:2,
                b:3,
                c:4
            }
        ]
        data = bar.find()
        expect(data.length).to.be(2)
    it "Update", ->
        bar.drop()
        bar.insert {
            a: 1
            b: 2
            c: {d: 3, e:4}
            f: (x) -> x * x
            g: [1,2,3,4]
            h: "abc"
            price: 10.99
            max1: 100
            max2: 200
            min1: 50
            min2: 30
        }
        bar.update {
            $set: {
                a:4
                "c.d": 5
            }
            $inc: {
                b: 2
            }
            $rename: {f:"function"}
            $unset: {h:""}
            $mul: {price: 1.25}
            $max: {max1:120, max2:150}
            $min: {min1:80, min2: 10}
        }
        data = bar.find()[0]
        expect(data.a).to.be(4)
        expect(data.c.d).to.be(5)
        expect(data.b).to.be(4)
        expect(data.f).not.to.be.ok()
        expect(Utils.isFunction(data.function)).to.be(true)
        expect(data.function(9)).to.be(81)
        expect(data.h).not.to.be.ok()
        expect(data.max1).to.be(120)
        expect(data.max2).to.be(200)
        expect(data.min1).to.be(50)
        expect(data.min2).to.be(10)
























