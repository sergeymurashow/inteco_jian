"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatalogs = void 0;
var fs_1 = __importDefault(require("fs"));
function createCatalogs(dir) {
    try {
        fs_1.default.readdirSync(dir);
    }
    catch (e) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
}
exports.createCatalogs = createCatalogs;
// createCatalogs(path.resolve('test2', 'test3'))
//# sourceMappingURL=createCatalogs.js.map