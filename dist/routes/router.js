"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var downloadFiles_1 = require("../src/downloadFiles");
exports.router = express_1.default.Router();
var jsonParser = body_parser_1.default.json();
exports.router.route('/parse')
    .get(function (req, res) {
    res.send({ response: 'It`s works!' });
})
    .post(jsonParser, function (req, res) {
    (0, downloadFiles_1.downloadFiles)(req.body);
    res.send({ status: 200 });
});
//# sourceMappingURL=router.js.map