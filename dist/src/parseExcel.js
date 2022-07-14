"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifestParser = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var lodash_1 = __importDefault(require("lodash"));
var callback_1 = require("../src/callback");
var xlsx_1 = __importDefault(require("xlsx"));
/*TODO
— Create object structure
— Group values by booking ID
*/
var filesDir = path_1.default.resolve('files');
var file = path_1.default.resolve(filesDir, 'manifest.xls');
var fileBody = fs_1.default.readFileSync(file, 'utf-8');
function manifestParser(params) {
    var _a;
    var obj = {
        data: {},
        set: function (data) {
            var keys = getAddr(Object.keys(data)[0]);
            var value = Object.values(data)[0];
            if (!this.data[keys.row])
                this.data[keys.row] = {};
            this.data[keys.row][keys.col] = value.v;
        },
        get: function () {
            return lodash_1.default.toArray(this.data);
        }
    };
    var sheet = xlsx_1.default.readFile(params.fileName).Sheets['Sheet1'];
    function getAddr(key) {
        return {
            col: key.match(/[A-Z]*/)[0],
            row: key.match(/\d+/)[0]
        };
    }
    for (var i in sheet) {
        if (!i.includes('!')) {
            obj.set((_a = {}, _a[i] = sheet[i], _a));
        }
    }
    var arrayData = obj.get();
    var collect = {};
    function getContainer(data) {
        return {
            mension: data.L,
            type: data.M,
            vol: data.N,
            number: data.O,
            seal: data.P,
            packages: data.Q,
            gWeight: data.R,
            tWeight: data.T,
            cbm: data.U,
            freight: data.V,
            owner: data.W
        };
    }
    function getBooking(data, voyageNumber) {
        return {
            bookingId: data.A,
            voyageNumber: voyageNumber,
            pkgs: data.C,
            packType: data.D,
            gWeight: data.E,
            desc: data.G,
            shipper: data.H,
            consignee: data.I,
            notifyParty: data.J,
            mark: data.K,
            hs: null,
            containers: [
                getContainer(data)
            ]
        };
    }
    var voyage = arrayData[2].C.match(/INT\d+/)[0];
    var tmp;
    arrayData.forEach(function (fo) {
        var chk = fo.A && fo.A.match(/INJIAN/);
        if (chk) {
            tmp = fo.A;
            collect[tmp] = getBooking(fo, voyage);
        }
        else if (tmp && fo.L) {
            if (fo.A)
                collect[tmp].hs = fo.A;
            collect[tmp]['containers'].push(getContainer(fo));
        }
    });
    collect = lodash_1.default.toArray(collect);
    (0, callback_1.sendParsed)('manifest', collect);
    console.log(collect);
    return collect;
}
exports.manifestParser = manifestParser;
//# sourceMappingURL=parseExcel.js.map