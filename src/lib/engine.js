// Generated by CoffeeScript 1.7.1
define(function(require, exports, module) {
  'use strict';
  var Engine, Proxy, Storage, Support;
  Support = require('lib/support');
  Storage = require('lib/storage');
  Proxy = require('lib/proxy');
  Engine = (function() {
    function Engine(session, encrypt, name, proxy) {
      this.session = session;
      this.encrypt = encrypt;
      this.name = name;
      this.proxy = proxy;
      if (this.proxy != null) {
        this.proxy = new Proxy(this.session, this.encrypt, this.name, this.proxy);
      } else {
        this.storage = new Storage(this.session, this.encrypt, this.name);
      }
      return;
    }

    Engine.prototype.key = function(index, callback) {
      return (this.proxy != null ? this.proxy : this.storage).key(index, callback);
    };

    Engine.prototype.size = function(callback) {
      return (this.proxy != null ? this.proxy : this.storage).size(callback);
    };

    Engine.prototype.setItem = function(key, val, callback) {
      return (this.proxy != null ? this.proxy : this.storage).setItem(key, val, callback);
    };

    Engine.prototype.getItem = function(key, callback) {
      return (this.proxy != null ? this.proxy : this.storage).getItem(key, callback);
    };

    Engine.prototype.removeItem = function(key, callback) {
      return (this.proxy != null ? this.proxy : this.storage).removeItem(key, callback);
    };

    Engine.prototype.usage = function(callback) {
      return (this.proxy != null ? this.proxy : this.storage).usage(callback);
    };

    return Engine;

  })();
  return module.exports = Engine;
});
