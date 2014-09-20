define("localdb/0.0.1/src/localdb-debug", [], function(require, exports, module) {
  // Generated by CoffeeScript 1.7.1
  'use strict';
  var Collection, LocalDB, Utils, dbPrefix;
  Utils = require("localdb/0.0.1/src/lib/utils-debug");
  Collection = require("localdb/0.0.1/src/lib/collection-debug");
  dbPrefix = "ldb_";
  LocalDB = (function() {
    /*
     *  Constructor
     *  var db = new LocalDB('foo')
     *  var db = new LocalDB('foo', localStorage)
     *  var db = new LocalDB('foo', sessionStorage)
     *
     *  localStorage would save the foo db even after browser closed.
     *  sessionStorage would only save the foo db while the brower stay open.
     *  localStorage by default
     */
    function LocalDB(dbName, ls) {
      this.ls = ls != null ? ls : localStorage;
      this.name = dbPrefix + dbName;
    }
    /*
     *  Get Collection Names
     *  db.collections()    //['foo','foo1','foo2','foo3',....]
     */
    LocalDB.prototype.collections = function() {
      var i, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.ls.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.ls.key(i).indexOf("" + this.name + "_") === 0) {
          _results.push(this.ls.key(i));
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
  LocalDB.isSupport = function() {
    if (typeof localStorage !== "undefined" && localStorage !== null) {
      return true;
    } else {
      return false;
    }
  };
  module.exports = LocalDB;
});
define("localdb/0.0.1/src/lib/utils-debug", [], function(require, exports, module) {
  // Generated by CoffeeScript 1.7.1
  var Utils, eq, toString, _isType;
  Utils = {};
  toString = Object.prototype.toString;
  _isType = function(type) {
    return function(obj) {
      return toString.call(obj).toLowerCase() === ("[object " + type + "]").toLowerCase();
    };
  };
  Utils.isType = function(ele, type) {
    return _isType(type)(ele);
  };
  Utils.isObject = _isType("object");
  Utils.isString = _isType("string");
  Utils.isNumber = _isType("number");
  Utils.isArray = _isType("array");
  Utils.isFunction = _isType("function");
  Utils.isRegex = _isType("regexp");
  Utils.isSameType = function(a, b) {
    return toString.call(a) === toString.call(b);
  };
  Utils.keys = function(obj) {
    var key;
    if (!Utils.isObject(obj)) {
      return [];
    }
    if (Object.keys) {
      return Object.keys(obj);
    }
    return (function() {
      var _results;
      _results = [];
      for (key in obj) {
        if (Utils.has(obj, key)) {
          _results.push(key);
        }
      }
      return _results;
    })();
  };
  Utils.has = function(obj, key) {
    return obj !== null && obj !== void 0 && Object.prototype.hasOwnProperty.call(obj, key);
  };
  /*
   *  isEqual function is implemented by underscore and I just rewrite in my project.
   *  https://github.com/jashkenas/underscore/blob/master/underscore.js
   */
  eq = function(a, b, aStack, bStack) {
    var aCtor, areArrays, bCtor, className, key, keys, length, result, size;
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    }
    if (a === null && b === void 0) {
      return false;
    }
    if (a === void 0 && b === null) {
      return false;
    }
    className = toString.call(a);
    if (className !== toString.call(b)) {
      return false;
    }
    switch (className) {
      case '[object RegExp]':
        return '' + a === '' + b;
      case '[object String]':
        return '' + a === '' + b;
      case '[object Number]':
        if (+a !== +a) {
          return +b !== +b;
        }
        if (+a === 0) {
          return 1 / +a === 1 / b;
        } else {
          return +a === +b;
        }
      case '[object Date]':
        return +a === +b;
      case '[object Boolean]':
        return +a === +b;
    }
    areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a !== 'object' || typeof b !== 'object') {
        return false;
      }
      aCtor = a.constructor;
      bCtor = b.constructor;
      if ((aCtor !== bCtor) && !(Utils.isFunction(aCtor) && aCtor instanceof aCtor && Utils.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    length = aStack.length;
    while (length--) {
      if (aStack[length] === a) {
        return bStack[length] === b;
      }
    }
    aStack.push(a);
    bStack.push(b);
    if (areArrays) {
      size = a.length;
      result = size === b.length;
      if (result) {
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) {
            break;
          }
        }
      }
    } else {
      keys = Utils.keys(a);
      size = keys.length;
      result = Utils.keys(b) === size;
      if (result) {
        while (size--) {
          key = keys[size];
          if (!(result = Utils.has(b, key) && eq(a[key], b[key], aStack, bStack))) {
            break;
          }
        }
      }
    }
    aStack.pop();
    bStack.pop();
    return result;
  };
  Utils.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };
  Utils.parse = function(str) {
    if ((str != null) && Utils.isString(str)) {
      return JSON.parse(str);
    } else {
      return [];
    }
  };
  Utils.stringify = function(obj) {
    if ((obj != null) && (Utils.isArray(obj) || Utils.isObject(obj))) {
      return JSON.stringify(obj);
    } else {
      return "[]";
    }
  };
  module.exports = Utils;
});
define("localdb/0.0.1/src/lib/collection-debug", [], function(require, exports, module) {
  // Generated by CoffeeScript 1.7.1
  'use strict';
  var Collection, Projection, Update, Utils, Where;
  Utils = require("localdb/0.0.1/src/lib/utils-debug");
  Projection = require("localdb/0.0.1/src/lib/projection-debug");
  Update = require("localdb/0.0.1/src/lib/update-debug");
  Where = require("localdb/0.0.1/src/lib/where-debug");
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
});
define("localdb/0.0.1/src/lib/projection-debug", [], function(require, exports, module) {
  // Generated by CoffeeScript 1.7.1
  'use strict';
  var Criteria, Projection, Utils, generateItem;
  Utils = require("localdb/0.0.1/src/lib/utils-debug");
  Criteria = require("localdb/0.0.1/src/lib/criteria-debug");
  Projection = {};
  Projection.generate = function(data, projection) {
    var d;
    if (JSON.stringify(projection) === "{}") {
      return data;
    }
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        d = data[_i];
        _results.push(generateItem(d, projection));
      }
      return _results;
    })();
  };
  generateItem = function(item, projection) {
    var flag, i, key, r, result, v_key, v_value, value, _i, _len;
    result = {};
    for (key in projection) {
      value = projection[key];
      if (key.indexOf(".$") !== -1) {
        key = key.split(".")[0];
        if (!Utils.isArray(item[key]) || item[key].length === 0) {
          continue;
        }
        result[key] = [item[key][0]];
      } else if (key.indexOf("$elemMatch") === 0) {
        if (!Utils.isArray(item) || item.length === 0) {
          continue;
        }
        r = [];
        for (_i = 0, _len = item.length; _i < _len; _i++) {
          i = item[_i];
          flag = true;
          for (v_key in value) {
            v_value = value[v_key];
            if (Utils.isObject(v_value)) {
              console.log("TODO");
            } else {
              if (i[v_key] !== v_value) {
                flag = false;
              }
            }
          }
          if (flag) {
            r.push(i);
          }
        }
        return r;
      } else if (Utils.isObject(value)) {
        result[key] = generateItem(item[key], value);
      } else {
        if (value === 1) {
          result[key] = item[key];
        }
      }
    }
    return result;
  };
  module.exports = Projection;
});
define("localdb/0.0.1/src/lib/criteria-debug", [], function(require, exports, module) {
  // Generated by CoffeeScript 1.7.1
  'use strict';
  var Criteria, Utils, arrayCheck, cmpCheck, dotCheck, logicCheck, numberCheck, regexCheck, stringCheck,
    __indexOf = [].indexOf || function(item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
      }
      return -1;
    };
  Utils = require("localdb/0.0.1/src/lib/utils-debug");
  dotCheck = function(data, key, condition) {
    return Criteria.check(data[key.split(".")[0]], new function() {
      return this[key.substr(key.indexOf('.') + 1)] = condition;
    });
  };
  numberCheck = function(obj, numberConditon) {
    if (Utils.isNumber(obj) && obj === numberConditon) {
      return true;
    }
    if (Utils.isArray(obj) && (__indexOf.call(obj, numberConditon) >= 0)) {
      return true;
    }
    return false;
  };
  stringCheck = function(obj, stringCondition) {
    if (Utils.isString(obj) && obj === stringCondition) {
      return true;
    }
    if (Utils.isArray(obj) && (__indexOf.call(obj, stringCondition) >= 0)) {
      return true;
    }
    return false;
  };
  regexCheck = function(obj, regexCondition) {
    var o, _i, _len;
    if (Utils.isString(obj) && regexCondition.test(obj)) {
      return true;
    }
    if (Utils.isArray(obj)) {
      for (_i = 0, _len = obj.length; _i < _len; _i++) {
        o = obj[_i];
        if (regexCondition.test(o)) {
          return true;
        }
      }
    }
    return false;
  };
  logicCheck = function(data, key, condition) {
    var c, k, v, _i, _j, _len, _len1;
    for (k in condition) {
      v = condition[k];
      if (k === "$not") {
        if (Criteria.check(data, new function() {
          return this[key] = v;
        })) {
          return false;
        } else {
          return true;
        }
      }
    }
    switch (key) {
      case "$and":
        for (_i = 0, _len = condition.length; _i < _len; _i++) {
          c = condition[_i];
          if (!Criteria.check(data, c)) {
            return false;
          }
        }
        break;
      case "$nor":
        for (_j = 0, _len1 = condition.length; _j < _len1; _j++) {
          c = condition[_j];
          if (Criteria.check(data, c)) {
            return false;
          }
        }
        break;
      case "$or":
        if (!(function() {
          var _k, _len2;
          for (_k = 0, _len2 = condition.length; _k < _len2; _k++) {
            c = condition[_k];
            if (Criteria.check(data, c)) {
              return true;
            }
          }
        })()) {
          return false;
        }
        break;
      default:
        return void 0;
    }
    return true;
  };
  arrayCheck = function(obj, arrayKey, arrayCondition) {
    var c, _i, _len;
    switch (arrayKey) {
      case "$all":
        if (!Utils.isArray(obj)) {
          return false;
        }
        for (_i = 0, _len = arrayCondition.length; _i < _len; _i++) {
          c = arrayCondition[_i];
          if (!(function() {
            var d, _j, _len1;
            for (_j = 0, _len1 = obj.length; _j < _len1; _j++) {
              d = obj[_j];
              if (Utils.isArray(c) ? arrayCheck(d, arrayKey, c) : d === c) {
                return true;
              }
            }
          })()) {
            return false;
          }
        }
        break;
      case "$elemMatch":
        if (!Utils.isArray(obj)) {
          return false;
        }
        if (!(function() {
          var d, _j, _len1;
          for (_j = 0, _len1 = obj.length; _j < _len1; _j++) {
            d = obj[_j];
            if (Criteria.check(d, arrayCondition)) {
              return true;
            }
          }
        })()) {
          return false;
        }
        break;
      case "$size":
        if (!Utils.isArray(obj)) {
          return false;
        }
        if (obj.length !== arrayCondition) {
          return false;
        }
        break;
      default:
        return void 0;
    }
    return true;
  };
  cmpCheck = function(obj, key, cmpCondition) {
    var c_key, c_v, c_value, flag, _i, _len, _ref;
    for (c_key in cmpCondition) {
      c_value = cmpCondition[c_key];
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
        case "$in":
          flag = true;
          for (_i = 0, _len = c_value.length; _i < _len; _i++) {
            c_v = c_value[_i];
            if (Utils.isRegex(c_v) && c_v.test(obj[key])) {
              flag = false;
              break;
            } else if (obj[key] === c_v) {
              flag = false;
              break;
            }
          }
          if (flag) {
            return false;
          }
          break;
        case "$nin":
          if (_ref = obj[key], __indexOf.call(c_value, _ref) >= 0) {
            return false;
          }
          break;
        case "$exists":
          if (c_value !== (obj[key] != null)) {
            return false;
          }
          break;
        case "$type":
          if (!Utils.isType(obj[key], c_value)) {
            return false;
          }
          break;
        case "$mod":
          if (obj[key] % c_value[0] !== c_value[1]) {
            return false;
          }
          break;
        case "$regex":
          if (!(new RegExp(c_value)).test(obj[key])) {
            return false;
          }
          break;
        default:
          if (!Criteria.check(obj[key], JSON.parse("{\"" + c_key + "\": " + (JSON.stringify(c_value)) + "}"))) {
            return false;
          }
      }
    }
    return true;
  };
  Criteria = {};
  Criteria.check = function(data, criteria) {
    var arrayCheckResult, condition, key, logicCheckResult;
    for (key in criteria) {
      condition = criteria[key];
      /* Dot Check
       *  criteria: {"a.b.c": 1}
       *  data: [{a:{b:{c:123}}}]
       *  run Criteria.check({b:{c:123}}, {"b.c":1})
       */
      if (key.indexOf(".") !== -1) {
        if (dotCheck(data, key, condition)) {
          continue;
        } else {
          return false;
        }
      }
      /* Number Check
       *  criteria: {a: 1}
       *  data: [{a: 1, b: 2, c: 3}] or [{a:[1,2,3]}]
       */
      if (Utils.isNumber(condition) && key !== "$size") {
        if (numberCheck(data[key], condition)) {
          continue;
        } else {
          return false;
        }
      }
      /* String Check
       *  criteria: {a: "abc"}
       *  data: [{a: "abc", b: 2, c: 3}] or [{a: ["abc","bcd","edf"], b: 2, c: 3}]
       */
      if (Utils.isString(condition)) {
        if (stringCheck(data[key], condition)) {
          continue;
        } else {
          return false;
        }
      }
      /* Regex Check
       *  criteria: {a: /abc+/}
       *  data: [{a: "abcabc"}] or [{a: ["abcabc", "aaa", "bbb"]}]
       */
      if (Utils.isRegex(condition)) {
        if (regexCheck(data[key], condition)) {
          continue;
        } else {
          return false;
        }
      }
      /* Logic Check
       *  $and criteria: {$and: [{a: 1}, {b: 2}]}
       *  data: [{a:1, b:2, c:3}]
       *  $or criteria: {$or: [{a: 1}, {b: 2}]}
       *  data: [{a:1, b:3, c:4}] or [{a:2, b:2, c:3}]
       *  $nor criteria: {$nor: [{a: 1}, {b: 2}]}
       *  data: [{a:2, b:3, c:4}]
       *  TODO $not criteria: {a: {$not: {$gt: 10}}} //a is field
       *  data: [{a:5, b:3, c:4}]
       *  TO DISCUSS : Should we add feature to support {$not: {a: 10}} kind of criteria?
       */
      logicCheckResult = logicCheck(data, key, condition);
      if (logicCheckResult != null) {
        if (logicCheckResult) {
          continue;
        } else {
          return false;
        }
      }
      /* Array Check
       *  $all criteria: {a: [1,2,3]}
       *  data: [{a: [1,2,3,4,5], b: 1}] or [{a: [[1,2,3],[1,2,4]]}]
       */
      arrayCheckResult = arrayCheck(data, key, condition);
      if (arrayCheckResult != null) {
        if (arrayCheckResult) {
          continue;
        } else {
          return false;
        }
      }
      if (cmpCheck(data, key, condition)) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  };
  module.exports = Criteria;
});
define("localdb/0.0.1/src/lib/update-debug", [], function(require, exports, module) {
  // Generated by CoffeeScript 1.7.1
  'use strict';
  var Criteria, Update, Utils, generate;
  Criteria = require("localdb/0.0.1/src/lib/criteria-debug");
  Utils = require("localdb/0.0.1/src/lib/utils-debug");
  generate = function(data, action, value, criteria) {
    var d, k, v, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _m, _n, _o, _p;
    switch (action) {
      case "$inc":
        for (k in value) {
          v = value[k];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            d = data[_i];
            if (Criteria.check(d, criteria) && Utils.isNumber(d[k])) {
              d[k] = d[k] + v;
            }
          }
        }
        break;
      case "$set":
        for (k in value) {
          v = value[k];
          for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
            d = data[_j];
            if (Criteria.check(d, criteria) && (d[k] != null)) {
              d[k] = v;
            }
          }
        }
        break;
      case "$mul":
        for (k in value) {
          v = value[k];
          for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
            d = data[_k];
            if (Criteria.check(d, criteria) && Utils.isNumber(d[k])) {
              d[k] = d[k] * v;
            }
          }
        }
        break;
      case "$rename":
        for (k in value) {
          v = value[k];
          for (_l = 0, _len3 = data.length; _l < _len3; _l++) {
            d = data[_l];
            if (!(Criteria.check(d, criteria) && (d[k] != null))) {
              continue;
            }
            d[v] = d[k];
            delete d[k];
          }
        }
        break;
      case "$unset":
        for (k in value) {
          for (_m = 0, _len4 = data.length; _m < _len4; _m++) {
            d = data[_m];
            if (Criteria.check(d, criteria) && (d[k] != null)) {
              delete d[k];
            }
          }
        }
        break;
      case "$min":
        for (k in value) {
          v = value[k];
          for (_n = 0, _len5 = data.length; _n < _len5; _n++) {
            d = data[_n];
            if (Criteria.check(d, criteria) && Utils.isNumber(d[k])) {
              d[k] = Math.min(d[k], v);
            }
          }
        }
        break;
      case "$max":
        for (k in value) {
          v = value[k];
          for (_o = 0, _len6 = data.length; _o < _len6; _o++) {
            d = data[_o];
            if (Criteria.check(d, criteria) && Utils.isNumber(d[k])) {
              d[k] = Math.max(d[k], v);
            }
          }
        }
        break;
      default:
        for (_p = 0, _len7 = data.length; _p < _len7; _p++) {
          d = data[_p];
          if (Criteria.check(d, criteria) && (d[action] != null)) {
            d[action] = value;
          }
        }
    }
    return data;
  };
  Update = function(data, actions, criteria) {
    var action, value;
    for (action in actions) {
      value = actions[action];
      data = generate(data, action, value, criteria);
    }
    return data;
  };
  module.exports = Update;
});
define("localdb/0.0.1/src/lib/where-debug", [], function(require, exports, module) {
  // Generated by CoffeeScript 1.7.1
  'use strict';
  var Utils, Where, arrayCheck, dotCheck, isKeyReserved, keywordCheck, numberCheck, objectCheck, regexCheck, reservedKeys, stringCheck, valueCheck,
    __indexOf = [].indexOf || function(item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
      }
      return -1;
    };
  Utils = require("localdb/0.0.1/src/lib/utils-debug");
  reservedKeys = ['$gt', '$gte', '$lt', '$lte', '$ne', '$in', '$nin', '$and', '$nor', '$or', '$not', '$exists', '$type', '$mod', '$regex', '$all', '$elemMatch', '$size'];
  isKeyReserved = function(key) {
    return __indexOf.call(reservedKeys, key) >= 0;
  };
  Where = function(data, conditions) {
    /*
     *  如果key中包含dot的话，则执行dotCheck
     *  执行valueCheck
     *  如果返回值为true的话，执行keywordCheck
     */
    var condition, key;
    for (key in conditions) {
      condition = conditions[key];
      if (key.indexOf(".") !== -1) {
        if (dotCheck(data, key, condition)) {
          continue;
        } else {
          return false;
        }
      }
      if (!valueCheck(data, key, condition)) {
        return false;
      }
      if (!keywordCheck(data, key, condition)) {
        return false;
      }
    }
    return true;
  };
  dotCheck = function(data, key, condition) {
    var firstKey;
    firstKey = key.split(".")[0];
    return Where(data[/\d/.test(firstKey) ? Number(firstKey) : firstKey], new function() {
      this[key.substr(key.indexOf('.') + 1)] = condition;
    });
  };
  valueCheck = function(data, key, condition) {
    /*
     *  如果key是关键字，则返回true
     *  如果condition是数字，则执行numberCheck
     *  如果condition是字符串，则执行stringCheck
     *  如果condition是正则表达式，则执行regexCheck
     *  如果condition是数组，则执行arrayCheck
     *  如果condition是对象，则执行objectCheck
     */
    var d;
    if (isKeyReserved(key)) {
      return true;
    }
    d = data[key];
    if (Utils.isNumber(condition) && !numberCheck(d, condition)) {
      return false;
    }
    if (Utils.isString(condition) && !stringCheck(d, condition)) {
      return false;
    }
    if (Utils.isRegex(condition) && !regexCheck(d, condition)) {
      return false;
    }
    if (Utils.isArray(condition) && !arrayCheck(d, condition)) {
      return false;
    }
    if (Utils.isObject(condition) && !objectCheck(d, condition)) {
      return false;
    }
    return true;
  };
  keywordCheck = function(data, key, condition) {
    var c, _i, _j, _k, _len, _len1, _len2;
    switch (key) {
      case "$gt":
        if (data <= condition) {
          return false;
        }
        break;
      case "$gte":
        if (data < condition) {
          return false;
        }
        break;
      case "$lt":
        if (data >= condition) {
          return false;
        }
        break;
      case "$lte":
        if (data > condition) {
          return false;
        }
        break;
      case "$ne":
        if (data === condition) {
          return false;
        }
        break;
      case "$in":
        if (!(function() {
          var c, _i, _len;
          for (_i = 0, _len = condition.length; _i < _len; _i++) {
            c = condition[_i];
            if ((Utils.isRegex(c) && c.test(data)) || (data === c)) {
              return true;
            }
          }
          return false;
        })()) {
          return false;
        }
        break;
      case "$nin":
        if (__indexOf.call(condition, data) >= 0) {
          return false;
        }
        break;
      case "$exists":
        if (condition !== (data != null)) {
          return false;
        }
        break;
      case "$type":
        if (!Utils.isType(data, condition)) {
          return false;
        }
        break;
      case "$mod":
        if (data % condition[0] !== condition[1]) {
          return false;
        }
        break;
      case "$regex":
        if (!(new RegExp(condition)).test(data)) {
          return false;
        }
        break;
      case "$and":
        for (_i = 0, _len = condition.length; _i < _len; _i++) {
          c = condition[_i];
          if (!Where(data, c)) {
            return false;
          }
        }
        break;
      case "$nor":
        for (_j = 0, _len1 = condition.length; _j < _len1; _j++) {
          c = condition[_j];
          if (Where(data, c)) {
            return false;
          }
        }
        break;
      case "$or":
        if (!(function() {
          var _k, _len2;
          for (_k = 0, _len2 = condition.length; _k < _len2; _k++) {
            c = condition[_k];
            if (Where(data, c)) {
              return true;
            }
          }
          return false;
        })()) {
          return false;
        }
        break;
      case "$not":
        if (Where(data, condition)) {
          return false;
        }
        break;
      case "$all":
        if (!Utils.isArray(data)) {
          return false;
        }
        for (_k = 0, _len2 = condition.length; _k < _len2; _k++) {
          c = condition[_k];
          if (!(function() {
            var d, _l, _len3;
            for (_l = 0, _len3 = data.length; _l < _len3; _l++) {
              d = data[_l];
              if (Utils.isArray(c) ? keywordCheck(d, key, c) : d === c) {
                return true;
              }
            }
          })()) {
            return false;
          }
        }
        break;
      case "$elemMatch":
        if (!Utils.isArray(data)) {
          return false;
        }
        if (!(function() {
          var d, _l, _len3;
          for (_l = 0, _len3 = data.length; _l < _len3; _l++) {
            d = data[_l];
            if (Where(d, condition)) {
              return true;
            }
          }
        })()) {
          return false;
        }
        break;
      case "$size":
        if (!Utils.isArray(data)) {
          return false;
        }
        if (data.length !== condition) {
          return false;
        }
    }
    return true;
  };
  numberCheck = function(data, cmpData) {
    /* Number Check
     *  cmpData: 1
     *  data: 1 or [1,2,3]
     */
    if (Utils.isNumber(data) && cmpData === data) {
      return true;
    }
    if (Utils.isArray(data) && (__indexOf.call(data, cmpData) >= 0)) {
      return true;
    }
    return false;
  };
  stringCheck = function(data, cmpData) {
    /* String Check
     *  cmpData: "abc"
     *  data: "abc" or ["abc","aaa","bbbb"]
     */
    if (Utils.isString(data) && cmpData === data) {
      return true;
    }
    if (Utils.isArray(data) && (__indexOf.call(data, cmpData) >= 0)) {
      return true;
    }
    return false;
  };
  regexCheck = function(data, cmpData) {
    /* Regex Check
     *  cmpData: /abc/
     *  data: "abcd" or ["abcdf","aaaa","basc","abce"]
     */
    var d, _i, _len;
    if (Utils.isString(data) && cmpData.test(data)) {
      return true;
    }
    if (Utils.isArray(data)) {
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        d = data[_i];
        if (cmpData.test(d)) {
          return true;
        }
      }
    }
    return false;
  };
  arrayCheck = function(data, cmpData) {
    return Utils.isEqual(data, cmpData);
  };
  objectCheck = function(data, conditions) {
    var c, flag, key;
    flag = true;
    for (key in conditions) {
      c = conditions[key];
      if (!(isKeyReserved(key))) {
        continue;
      }
      flag = false;
      if (!Where(data, new function() {
        this[key] = c;
      })) {
        return false;
      }
    }
    if (flag) {
      return Utils.isEqual(data, c);
    } else {
      return true;
    }
  };
  module.exports = Where;
});