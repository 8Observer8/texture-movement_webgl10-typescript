(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Class1 = /** @class */ (function () {
    function Class1() {
        this._name = "Class1";
    }
    Object.defineProperty(Class1.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Class1;
}());
exports.Class1 = Class1;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Class2 = /** @class */ (function () {
    function Class2() {
        this._name = "Class2";
    }
    Object.defineProperty(Class2.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Class2;
}());
exports.Class2 = Class2;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Class1_1 = require("./Class1");
var Class2_1 = require("./Class2");
var Program = /** @class */ (function () {
    function Program() {
    }
    Program.Main = function () {
        var instance1 = new Class1_1.Class1();
        var instance2 = new Class2_1.Class2();
        console.log(instance1.Name);
        console.log(instance2.Name);
    };
    return Program;
}());
// Debug Version
// Program.Main();
// Release Version
window.onload = function () { return Program.Main(); };

},{"./Class1":1,"./Class2":2}]},{},[3]);
