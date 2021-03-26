"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalStockInfo = void 0;
var yahooStockPrices = require("yahoo-stock-prices");
var checking_1 = require("../../modules/checking");
var errorTicker = [];
//string 날짜를 number 형식으로 분리 ex: "20020123" => [2020,01,23]
var separateStrDate = function (date_str) {
    var date = new Date(date_str);
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
    };
};
//기준일로 부터 seconds초 후 Date return
var seconds2dateForm = function (seconds) {
    var calcuBaseDate = "1970-1-1";
    var date = new Date(calcuBaseDate);
    date.setSeconds(date.getSeconds() + seconds);
    return date;
};
//get 한가지 주식의 정보
var getAstockInfo = function (ticker, start_date, end_date) { return __awaiter(void 0, void 0, void 0, function () {
    var start_date_arr, end_date_arr, yahooStockPricesInfo_1, filtered_yahooStockPricesInfo, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                start_date_arr = void 0;
                if (start_date != undefined) {
                    start_date_arr = separateStrDate(start_date);
                }
                else {
                    start_date_arr = { year: 0, month: 0, day: 0 };
                }
                end_date_arr = void 0;
                if (end_date != undefined) {
                    end_date_arr = separateStrDate(end_date);
                }
                else {
                    end_date_arr = separateStrDate(String(new Date()));
                }
                return [4 /*yield*/, yahooStockPrices.getHistoricalPrices(start_date_arr.month, start_date_arr.day, start_date_arr.year, end_date_arr.month, end_date_arr.day, end_date_arr.year, ticker, "1d")];
            case 1:
                yahooStockPricesInfo_1 = _a.sent();
                filtered_yahooStockPricesInfo = (function () {
                    var result = [];
                    yahooStockPricesInfo_1.map(function (data) {
                        //빈값 확인
                        if (checking_1.checkEmpty(data.date) &&
                            checking_1.checkEmpty(data.open) &&
                            checking_1.checkEmpty(data.high) &&
                            checking_1.checkEmpty(data.low) &&
                            checking_1.checkEmpty(data.close) &&
                            checking_1.checkEmpty(data.adjclose) &&
                            checking_1.checkEmpty(data.volume)) {
                            //초단위로 계산되었던 날짜 정보를 Date타입으로 변경
                            var date = seconds2dateForm(data.date);
                            result.push({
                                date: date,
                                open: data.open,
                                high: data.high,
                                low: data.low,
                                close: data.close,
                                volume: data.volume,
                                adjclose: data.adjclose,
                            });
                        }
                    });
                    //역순으로 재배치
                    result.reverse();
                    return result;
                })();
                return [2 /*return*/, filtered_yahooStockPricesInfo];
            case 2:
                e_1 = _a.sent();
                errorTicker.push(ticker);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//get 전체 주식정보
var getTotalStockInfo = function (json_data, start_date, end_date) { return __awaiter(void 0, void 0, void 0, function () {
    var tickerArr, unique_tickerArr, totalStockInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tickerArr = json_data.map(function (data) { return data.ticker; });
                unique_tickerArr = Array.from(new Set(tickerArr));
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    result = [];
                                    return [4 /*yield*/, Promise.all(unique_tickerArr.map(function (ticker) { return __awaiter(void 0, void 0, void 0, function () {
                                            var aStockInfo;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, getAstockInfo(ticker, start_date, end_date)];
                                                    case 1:
                                                        aStockInfo = _a.sent();
                                                        if (checking_1.checkEmpty(aStockInfo)) {
                                                            result.push({
                                                                ticker: ticker,
                                                                data: aStockInfo,
                                                            });
                                                        }
                                                        else {
                                                            errorTicker.push(ticker);
                                                        }
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, result];
                            }
                        });
                    }); })()];
            case 1:
                totalStockInfo = _a.sent();
                return [2 /*return*/, { stockData: totalStockInfo, errorTicker: errorTicker }];
        }
    });
}); };
exports.getTotalStockInfo = getTotalStockInfo;