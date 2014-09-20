// Generated by CoffeeScript 1.7.1
'use strict';
var Collection, LocalDB, db, expect;

expect = require('expect.js');

LocalDB = require('../src/localdb.js');

Collection = require('../src/lib/collection.js');

db = new LocalDB("foo");

describe('Collection', function() {
  var collection;
  it('Collection Init', function() {
    var collection;
    collection = db.collection("bar");
    expect(collection).to.be.ok();
    collection = new Collection("bar", db);
    return expect(collection).to.be.ok();
  });
  collection = db.collection("bar");
  it('Collection insert', function() {
    collection.insert({
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: "4",
        f: 5
      }
    });
    collection.insert({
      a: 2,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 3,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 4,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 5,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 6,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 7,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 8,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 10,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 11,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 12,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 13,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 14,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    collection.insert({
      a: 15,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      }
    });
    return expect(collection.find().length).to.be(14);
  });
  it('Collection update', function() {
    collection.update({
      $set: {
        b: 4,
        c: 5
      }
    }, {
      where: {
        a: {
          $gt: 0,
          $lt: 10
        },
        "d.e": "4"
      }
    });
    expect(collection.find()[0].b).to.be(4);
    return expect(collection.find()[0].c).to.be(5);
  });
  it('Collection find', function() {
    var data;
    data = collection.find({
      where: {
        a: {
          $gt: 1,
          $lt: 10
        }
      },
      projection: {
        a: 1,
        b: 1,
        c: 0
      },
      limit: 4
    });
    return expect(data).to.be.a("array");
  });
  it('Collection findOne', function() {
    var data;
    data = collection.findOne({
      where: {
        a: {
          $lt: 3
        }
      }
    });
    return expect(data.length).to.be(1 || 0);
  });
  it('Collection remove', function() {
    console.log(collection.find());
    collection.remove({
      where: {
        a: 99
      }
    });
    collection.remove({
      where: {
        a: {
          $gt: 3,
          $lt: 10
        }
      }
    });
    console.log(collection.find());
    collection.remove(null);
    return expect(collection.find().length).to.be(0);
  });
  return it('Collection drop', function() {
    collection = db.collection("collection_bar");
    collection.drop();
    return expect(collection.find().length).to.be(0);
  });
});
