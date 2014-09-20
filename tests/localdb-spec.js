// Generated by CoffeeScript 1.7.1
'use strict';
var LocalDB, expect,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

expect = require('expect.js');

LocalDB = require('../src/localdb.js');

describe('LocalDB', function() {
  var collection, db;
  it('LocalStorage Support', function() {
    return expect(LocalDB.isSupport()).to.be.ok();
  });
  it('Init DB', function() {
    var db;
    db = new LocalDB("db_foo");
    return expect(db).to.be.a("object");
  });
  it('Drop DB', function() {
    var db;
    db = new LocalDB("db_foo");
    return expect(db.drop()).to.be.ok();
  });
  db = new LocalDB("db_foo");
  it('Drop Collection By DB', function() {
    db.drop("collection_bar");
    return expect(collection.find().length).to.be(0);
  });
  it('Drop COllection By Collection', function() {
    var collection;
    collection = db.collection("collection_bar");
    collection.drop();
    return expect(collection.find().length).to.be(0);
  });
  collection = db.collection("collection_bar");
  it('Insert Data', function() {
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
  it('Get Collections', function() {
    var collections;
    collections = db.collections();
    console.log(collections);
    return expect(db.collections()).to.be.a("array");
  });
  it('Get Collection', function() {
    collection = db.collection("collection_bar");
    return expect(collection).to.be.a("object");
  });
  it('Update Data', function() {
    collection.update({
      $set: {
        b: 4,
        c: 5
      }
    }, {
      where: {
        a: {
          $gt: 3,
          $lt: 10
        },
        d: {
          e: 4
        }
      }
    });
    expect(collection.find()[6].b).to.be(4);
    return expect(collection.find()[6].c).to.be(5);
  });
  it('find', function() {
    var data;
    data = collection.find({
      where: {
        a: {
          $lt: 3
        },
        b: 2
      },
      projection: {
        a: 1,
        b: 1,
        c: 0
      },
      limit: 4
    });
    console.log(data);
    return expect(data).to.be.a("array");
  });
  it('Fine One Data', function() {
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
  it('$in', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      where: {
        a: {
          $in: [3, 4, 5]
        }
      }
    });
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.a).to.be.within(3, 5));
    }
    return _results;
  });
  it('$nin', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      where: {
        a: {
          $nin: [3, 4, 5]
        }
      }
    });
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.a).not.to.be.within(3, 5));
    }
    return _results;
  });
  it('$and', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      where: {
        $and: [
          {
            b: 4
          }, {
            a: 5
          }
        ]
      }
    });
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.b).to.be(4));
    }
    return _results;
  });
  it('$not', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      where: {
        b: {
          $not: 4
        }
      }
    });
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.b).not.to.be(4));
    }
    return _results;
  });
  it('$nor', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      where: {
        $nor: [
          {
            b: 4
          }, {
            a: 1
          }, {
            a: 2
          }
        ]
      }
    });
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      expect(d.b).not.to.be(4);
      expect(d.a).not.to.be(1);
      _results.push(expect(d.a).not.to.be(2));
    }
    return _results;
  });
  it('$or', function() {
    var data;
    data = collection.find({
      where: {
        $or: [
          {
            a: 1
          }, {
            a: 2
          }
        ]
      }
    });
    return expect(data).to.be.eql([
      {
        "a": 1,
        "b": 2,
        "c": 3,
        "d": {
          "e": 4,
          "f": 5
        }
      }, {
        "a": 2,
        "b": 2,
        "c": 3,
        "d": {
          "e": 4,
          "f": 5
        }
      }
    ]);
  });
  it('$exists', function() {
    var d, data, _i, _j, _len, _len1, _results;
    data = collection.find({
      where: {
        a: {
          $exists: false
        }
      }
    });
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      expect(d.a != null).not.to.be.ok();
    }
    data = collection.find({
      where: {
        a: {
          $exists: true
        }
      }
    });
    _results = [];
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      d = data[_j];
      _results.push(expect(d.a != null).to.be.ok());
    }
    return _results;
  });
  it('$exists', function() {
    var data;
    data = collection.find({
      where: {
        a: {
          $type: "number"
        },
        b: {
          $type: "number"
        },
        d: {
          $type: "object"
        },
        "d.e": {
          $type: "string"
        }
      }
    });
    return expect(data).to.be.eql([
      {
        "a": 1,
        "b": 2,
        "c": 3,
        "d": {
          "e": "4",
          "f": 5
        }
      }
    ]);
  });
  it('$mod', function() {
    var d, data, _i, _len, _results;
    data = collection.find({
      where: {
        a: {
          $mod: [4, 0]
        }
      }
    });
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push(expect(d.a % 4).to.be(0));
    }
    return _results;
  });
  it('$regex', function() {
    var d, data, _i, _j, _len, _len1;
    collection.insert({
      a: 15,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      },
      g: "Hello World"
    });
    data = collection.find({
      where: {
        g: {
          $regex: 'ello'
        }
      }
    });
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      expect(/ello/.test(d.g)).to.be.ok();
    }
    data = collection.find({
      where: {
        g: /ello/
      }
    });
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      d = data[_j];
      expect(/ello/.test(d.g)).to.be.ok();
    }
    collection.insert({
      a: 15,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5
      },
      g: ["Hello World"]
    });
    return data = collection.find({
      where: {
        g: /ello/
      }
    });
  });
  it('$all', function() {
    var d, data, _i, _j, _k, _l, _len, _len1, _len2, _len3, _results;
    collection.insert({
      a: 1,
      b: 2,
      c: 3,
      h: [1, 2, 3, 4],
      i: [[1, 2, 3], [1, 2, 4]]
    });
    data = collection.find({
      where: {
        h: {
          $all: [1, 2]
        }
      }
    });
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      expect(__indexOf.call(d.h, 1) >= 0).to.be.ok();
    }
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      d = data[_j];
      expect(__indexOf.call(d.h, 2) >= 0).to.be.ok();
    }
    data = collection.find({
      where: {
        i: {
          $all: [[1, 2]]
        }
      }
    });
    for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
      d = data[_k];
      expect(__indexOf.call(d.i[0], 1) >= 0).to.be.ok();
    }
    _results = [];
    for (_l = 0, _len3 = data.length; _l < _len3; _l++) {
      d = data[_l];
      _results.push(expect(__indexOf.call(d.i[0], 2) >= 0).to.be.ok());
    }
    return _results;
  });
  it('$elemMatch', function() {
    var data;
    collection.insert({
      _id: 1,
      results: [
        {
          product: "abc",
          score: 10
        }, {
          product: "xyz",
          score: 5
        }
      ]
    });
    collection.insert({
      _id: 2,
      results: [
        {
          product: "abc",
          score: 8
        }, {
          product: "xyz",
          score: 7
        }
      ]
    });
    collection.insert({
      _id: 3,
      results: [
        {
          product: "abc",
          score: 7
        }, {
          product: "xyz",
          score: 8
        }
      ]
    });
    data = collection.find({
      where: {
        results: {
          $elemMatch: {
            product: "xyz",
            score: {
              $gte: 8
            }
          }
        }
      }
    });
    return expect(data).to.be.eql([
      {
        "_id": 3,
        "results": [
          {
            "product": "abc",
            "score": 7
          }, {
            "product": "xyz",
            "score": 8
          }
        ]
      }
    ]);
  });
  it('$size', function() {
    var data;
    data = collection.find({
      where: {
        results: {
          $size: 2
        }
      }
    });
    return expect(data.length).to.be(3);
  });
  it('projection $', function() {
    var data;
    collection.insert({
      "_id": 1,
      "semester": 1,
      "grades": [70, 87, 90]
    });
    collection.insert({
      "_id": 2,
      "semester": 1,
      "grades": [90, 88, 92]
    });
    collection.insert({
      "_id": 3,
      "semester": 1,
      "grades": [85, 100, 90]
    });
    collection.insert({
      "_id": 4,
      "semester": 2,
      "grades": [79, 85, 80]
    });
    collection.insert({
      "_id": 5,
      "semester": 2,
      "grades": [88, 88, 92]
    });
    collection.insert({
      "_id": 6,
      "semester": 2,
      "grades": [95, 90, 96]
    });
    return data = collection.find({
      where: {
        semester: 1,
        grades: {
          $gte: 85
        }
      },
      projection: {
        "grades.$": 1
      }
    });
  });
  it('projection $elemMatch', function() {
    var data;
    collection.insert({
      _id: 1,
      zipcode: "63109",
      students: [
        {
          name: "john",
          school: 102,
          age: 10
        }, {
          name: "jess",
          school: 102,
          age: 11
        }, {
          name: "jeff",
          school: 108,
          age: 15
        }
      ]
    });
    return data = collection.find({
      where: {
        zipcode: "63109"
      },
      projection: {
        students: {
          $elemMatch: {
            school: 102
          }
        }
      }
    });
  });
  it('update $inc', function() {
    collection.insert({
      age: 1
    });
    console.log(collection.find({
      where: {
        age: {
          $exists: true
        }
      }
    }));
    collection.update({
      $set: {
        age: 10
      },
      $inc: {
        age: 2
      }
    });
    console.log(collection.find({
      where: {
        age: {
          $exists: true
        }
      }
    }));
    collection.update({
      age: 100,
      $inc: {
        age: 2
      }
    });
    return console.log(collection.find({
      where: {
        age: {
          $exists: true
        }
      }
    }));
  });
  it('update $mul', function() {
    collection.insert({
      _id: 1,
      item: "ABC",
      price: 10.99
    });
    console.log(collection.find({
      where: {
        price: {
          $exists: true
        }
      }
    }));
    collection.update({
      $mul: {
        price: 1.25
      }
    });
    return console.log(collection.find({
      where: {
        price: {
          $exists: true
        }
      }
    }));
  });
  it('update $rename', function() {
    collection.insert({
      "_id": 1,
      "alias": ["The American Cincinnatus", "The American Fabius"],
      "mobile": "555-555-5555",
      "nmae": {
        "first": "george",
        "last": "washington"
      }
    });
    collection.update({
      $rename: {
        "nmae": "name",
        "alias": "nickname"
      }
    });
    console.log(collection.find({
      where: {
        nmae: {
          $exists: true
        }
      }
    }));
    return console.log(collection.find({
      where: {
        name: {
          $exists: true
        }
      }
    }));
  });
  it('update $unset', function() {
    collection.insert({
      "_id": 1,
      "alias": ["The American Cincinnatus", "The American Fabius"],
      "mobile1": "555-555-5555",
      "nmae": {
        "first": "george",
        "last": "washington"
      }
    });
    collection.update({
      $unset: {
        alias: "",
        nmae: ""
      }
    });
    return console.log(collection.find({
      where: {
        mobile1: {
          $exists: true
        }
      }
    }));
  });
  return it('update $min && $max', function() {
    collection.insert({
      _id: 1,
      highScore: 800,
      lowScore: 200
    });
    collection.update({
      $min: {
        lowScore: 150
      },
      $max: {
        highScore: 1000
      }
    });
    return console.log(collection.find({
      where: {
        highScore: {
          $exists: true
        }
      }
    }));
  });
});
