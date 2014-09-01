// Generated by CoffeeScript 1.7.1

/*
 * localDB
 * localDB.emptystack.net
 *
 * Copyright (c) 2014 Eric Wang
 * Licensed under the MIT license.
 */
define(function(require, exports, module) {
  'use strict';
  var criteriaCheck, dbPrefix, isArray, isFunction, isNumber, isObject, isString, isType, localDB, ls, parse, stringify, _isType;
  ls = window.localStorage;
  dbPrefix = "ldb_";
  _isType = function(type) {
    return function(obj) {
      return {}.toString.call(obj) === ("[object " + (type.toLowerCase().replace(/\w/, function(w) {
        return w.toUpperCase();
      })) + "]");
    };
  };
  isType = function(ele, type) {
    return _isType(type)(ele);
  };
  isObject = _isType("object");
  isString = _isType("string");
  isArray = _isType("array");
  isFunction = _isType("function");
  isNumber = _isType("number");
  parse = function(str) {
    if ((str != null) && isString(str)) {
      return JSON.parse(str);
    } else {
      return [];
    }
  };
  stringify = function(obj) {
    if ((obj != null) && isArray(obj)) {
      return JSON.stringify(obj);
    } else {
      return "[]";
    }
  };
  criteriaCheck = function(obj, criteria) {
    var c_key, c_value, condition, key;
    for (key in criteria) {
      condition = criteria[key];
      if (obj[key] == null) {
        return false;
      }
      if (isObject(condition)) {
        for (c_key in condition) {
          c_value = condition[c_key];
          switch (c_key) {
            case "$gt":
              if (obj[key] <= c_value) {
                return false;
              }
              break;
            case "$gte":
              if (obj[key] < c_value) {
                return false;
              }
              break;
            case "$lt":
              if (obj[key] >= c_value) {
                return false;
              }
              break;
            case "$lte":
              if (obj[key] > c_value) {
                return false;
              }
              break;
            case "$ne":
              if (obj[key] === c_value) {
                return false;
              }
              break;
            default:
              if (!criteriaCheck(obj[key], JSON.parse("{\"" + c_key + "\": " + (JSON.stringify(c_value)) + "}"))) {
                return false;
              }
          }
        }
      } else {
        if (obj[key] !== condition) {
          return false;
        }
      }
    }
    return true;
  };
  localDB = localDB || function(dbName, storageType) {
    ls = storageType;
    this.db = dbPrefix + dbName;
    if (ls.getItem(this.db) == null) {
      ls.setItem(this.db, "_");
    }
    this.length = function() {
      return this.collections().length;
    };
  };
  localDB.isSupport = function() {
    if (typeof localStorage !== "undefined" && localStorage !== null) {
      return true;
    } else {
      return false;
    }
  };
  localDB.prototype.serialize = function(collectionName, collection) {
    return ls.setItem("" + this.db + "_" + collectionName, stringify(collection));
  };
  localDB.prototype.deserialize = function(collectionName, sort) {
    var collection;
    if (sort == null) {
      sort = {};
    }
    return collection = parse(ls.getItem("" + this.db + "_" + collectionName));
  };
  localDB.prototype.drop = function(collectionName) {
    var i, j, keys, _i, _len;
    collectionName = collectionName != null ? "_" + collectionName : "";
    keys = (function() {
      var _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = ls.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (ls.key(i).indexOf(this.db + collectionName) === 0) {
          _results.push(ls.key(i));
        }
      }
      return _results;
    }).call(this);
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      j = keys[_i];
      ls.removeItem(j);
    }
  };
  localDB.prototype.collections = function() {
    var i, _i, _ref, _results;
    if (this.db != null) {
      _results = [];
      for (i = _i = 0, _ref = ls.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (ls.key(i).indexOf("" + this.db + "_") === 0) {
          _results.push(ls.key(i));
        }
      }
      return _results;
    } else {
      return [];
    }
  };
  localDB.prototype.insert = function(collectionName, rowData) {
    var collection;
    collection = this.deserialize(collectionName);
    collection.push(rowData);
    this.serialize(collectionName, collection);
    return this;
  };
  localDB.prototype.find = function(collectionName, options) {
    var c, criteria, d, data, key, limit, projection, r, result, value, _i, _j, _len, _len1, _ref;
    if (options == null) {
      options = {};
    }
    criteria = options.criteria != null ? options.criteria : {};
    projection = options.projection != null ? options.projection : {};
    limit = options.limit != null ? options.limit : -1;
    data = [];
    _ref = this.deserialize(collectionName, options.sort);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      if (!(criteriaCheck(c, criteria))) {
        continue;
      }
      if (limit === 0) {
        break;
      }
      limit = limit - 1;
      data.push(c);
    }
    if (JSON.stringify(projection) === '{}') {
      return data;
    }
    result = [];
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      d = data[_j];
      r = {};
      for (key in projection) {
        value = projection[key];
        if (value === 1) {
          r[key] = d[key];
        }
      }
      result.push(r);
    }
    return result;
  };
  localDB.prototype.findOne = function(collectionName, options) {
    if (options == null) {
      options = {};
    }
    options.limit = 1;
    return this.find(collectionName, options);
  };
  localDB.prototype.update = function(collectionName, options) {
    var action, actions, c, collection, criteria, key, value, _i, _len;
    if (options == null) {
      options = {};
    }
    action = options.action;
    criteria = options.criteria != null ? options.criteria : {};
    collection = this.deserialize(collectionName);
    for (_i = 0, _len = collection.length; _i < _len; _i++) {
      c = collection[_i];
      if (!(criteriaCheck(c, criteria))) {
        continue;
      }
      actions = action.$set;
      for (key in actions) {
        value = actions[key];
        c[key] = value;
      }
    }
    return this.serialize(collectionName, collection);
  };
  localDB.prototype.remove = function(collectionName, options) {
    var c, criteria;
    if (options == null) {
      options = {};
    }
    criteria = options.criteria != null ? options.criteria : {};
    return this.serialize(collectionName, (function() {
      var _i, _len, _ref, _results;
      _ref = this.deserialize(collectionName);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        if (!criteriaCheck(c, criteria)) {
          _results.push(c);
        }
      }
      return _results;
    }).call(this));
  };
  module.exports = localDB;
});
