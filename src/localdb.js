// Generated by CoffeeScript 1.7.1
'use strict';
var Collection, LocalDB, Utils, dbPrefix;

Utils = require('./lib/utils');

Collection = require('./lib/collection');

dbPrefix = "ldb_";

LocalDB = (function() {

  /*
   *  Constructor
   *  var db = new LocalDB('foo')
   *  var db = new LocalDB('foo', {engine: localStorage})
   *  var db = new LocalDB('foo', {engine: sessionStorage})
   *
   *  localStorage would save the foo db even after browser closed.
   *  sessionStorage would only save the foo db while the brower stay open.
   *  localStorage by default
   */
  function LocalDB(dbName, options) {
    if (options == null) {
      options = {};
    }
    this.name = dbPrefix + dbName;
    this.ls = options.engine || localStorage;
  }

  LocalDB.prototype.options = function() {
    return {
      name: this.name.substr(dbPrefix.length),
      engine: this.ls
    };
  };


  /*
   *  Get Collection Names
   *  db.collections()    //['foo','foo1','foo2','foo3',....]
   */

  LocalDB.prototype.collections = function() {
    var i, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = this.ls.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (this.ls.key(i).indexOf("" + this.name + "_") === 0) {
        _results.push(this.ls.key(i).substr(("" + this.name + "_").length));
      }
    }
    return _results;
  };


  /*
   *  Get Collection
   *  var collection = db.collection('bar')
   */

  LocalDB.prototype.collection = function(collectionName) {
    return new Collection(collectionName, this);
  };


  /*
   *  Delete Collection: db.drop(collectionName)
   *  Delete DB: db.drop()
   */

  LocalDB.prototype.drop = function(collectionName) {
    var i, j, keys, _i, _len;
    collectionName = collectionName != null ? "_" + collectionName : "";
    keys = (function() {
      var _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.ls.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.ls.key(i).indexOf(this.name + collectionName) === 0) {
          _results.push(this.ls.key(i));
        }
      }
      return _results;
    }).call(this);
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      j = keys[_i];
      this.ls.removeItem(j);
    }
    return true;
  };

  return LocalDB;

})();


/*
 *  Check Browser Compatibility
 *  use LocalDB.isSupport() to check whether the browser support LocalDB or not.
 */

LocalDB.support = function() {
  return {
    localStorage: typeof localStorage !== "undefined" && localStorage !== null ? true : false,
    sessionStorage: typeof sessionStorage !== "undefined" && sessionStorage !== null ? true : false,
    indexedDB: typeof indexedDB !== "undefined" && indexedDB !== null ? true : false
  };
};

module.exports = LocalDB;
