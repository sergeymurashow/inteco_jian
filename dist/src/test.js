"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var test = {
    'a': 'HS Code',
    'b': 'H.S. Code',
    'c': 'HS'
};
var reg = /H.*?S.*?(Code)*/;
var t1 = test.a.match(reg);
var t2 = test.b.match(reg);
var t3 = test.c.match(reg);
var lodash_1 = __importDefault(require("lodash"));
var r = lodash_1.default.filter([1, 2], function (f) {
    return f === 1;
});
//# sourceMappingURL=test.js.map