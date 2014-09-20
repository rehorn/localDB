// Generated by CoffeeScript 1.7.1
'use strict';
var Collection, Projection, Update, Utils, Where;

Utils = require('./utils');

Projection = require('./projection');

Update = require('./update');

Where = require('./where');

Collection = (function() {

  /*
   *  in LocalDB, only use LocalDB to get a collection.
   *  db = new LocalDB('foo')
   *  var collection = db.collection('bar')
   */
  function Collection(collectionName, db) {
    this.name = "" + db.name + "_" + collectionName;
    this.ls = db.ls;
    this.deserialize();
  }


  /*
   *  get data and tranfer into object from localStorage/sessionStorage
   */

  Collection.prototype.deserialize = function() {
    return this.data = Utils.parse(this.ls.getItem(this.name));
  };


  /*
   *  save data into localStorage/sessionStorage
   */

  Collection.prototype.serialize = function() {
    return this.ls.setItem(this.name, Utils.stringify(this.data));
  };


  /*
   *  delete this collection
   */

  Collection.prototype.drop = function() {
    return this.ls.removeItem(this.name);
  };


  /*
   *  insert data into collection
   */

  Collection.prototype.insert = function(rowData) {
    this.deserialize();
    this.data.push(rowData);
    return this.serialize();
  };


  /*
   *  update collection
   */

  Collection.prototype.update = function(actions, options) {
    var where;
    if (options == null) {
      options = {};
    }
    where = options.where || {};
    this.deserialize();
    this.data = Update(this.data, actions, where);
    return this.serialize();
  };


  /*
   *  remove data from collection
   */

  Collection.prototype.remove = function(options) {
    var d, where;
    if (options == null) {
      options = {};
    }
    where = options.where || {};
    this.deserialize();
    this.data = (function() {
      var _i, _len, _ref, _results;
      _ref = this.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        d = _ref[_i];
        if (!Where(d, where)) {
          _results.push(d);
        }
      }
      return _results;
    }).call(this);
    return this.serialize();
  };


  /*
   * find data from collection
   */

  Collection.prototype.find = function(options) {
    var d, limit, projection, result, where, _i, _len, _ref;
    if (options == null) {
      options = {};
    }
    where = options.where || {};
    projection = options.projection || {};
    limit = options.limit || -1;
    this.deserialize();
    result = [];
    _ref = this.data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      d = _ref[_i];
      if (!(Where(d, where))) {
        continue;
      }
      if (limit === 0) {
        break;
      }
      limit = limit - 1;
      result.push(d);
    }
    return Projection.generate(result, projection);
  };


  /*
   *  find data and only return one data from collection
   */

  Collection.prototype.findOne = function(options) {
    if (options == null) {
      options = {};
    }
    options.limit = 1;
    return this.find(options);
  };

  return Collection;

})();

module.exports = Collection;
