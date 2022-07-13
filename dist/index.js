"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var router_1 = require("./routes/router");
var configPath = { path: 'config.env' };
dotenv_1.default.config(configPath);
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use('/api', router_1.router);
app.listen(port, function () { return console.log("Running on port ".concat(port)); });
//# sourceMappingURL=index.js.map