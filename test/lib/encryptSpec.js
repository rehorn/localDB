// Generated by CoffeeScript 1.8.0
define(function(require, exports, module) {
  "use strict";
  var Encrypt;
  Encrypt = require("lib/encrypt");
  return describe("Encrypt", function() {
    return it("encode", function() {
      var key, str, str2, str3, value;
      value = "刘强东喝奶茶1234567890+=——_·！@#￥%……&*（）——+￥{}[].,;";
      key = "奶茶妹";
      str = Encrypt.encode(value, key);
      console.log(value + "加密后：" + str);
      str2 = Encrypt.decode(str, key);
      console.log(str + "解密后：" + str2);
      expect(str2).toEqual(value);
      str3 = Encrypt.encode(void 0, key);
      return expect(str3).toEqual(null);
    });
  });
});
