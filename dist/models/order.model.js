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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.order = void 0;
var database_1 = __importDefault(require("../database"));
var enum_1 = require("../helper/enum");
var order = /** @class */ (function () {
    function order() {
    }
    order.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, sql_command, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db = _a.sent();
                        sql_command = "SELECT * FROM orders";
                        return [4 /*yield*/, db.query(sql_command)];
                    case 2:
                        result = _a.sent();
                        db.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    order.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, sql_command, result, sql_command_products, result_product, ordersWithProduct, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db = _a.sent();
                        sql_command = "SELECT * FROM orders WHERE id=".concat(id);
                        return [4 /*yield*/, db.query(sql_command)];
                    case 2:
                        result = _a.sent();
                        sql_command_products = "SELECT * FROM ordersproducts WHERE order_id=".concat(id);
                        return [4 /*yield*/, db.query(sql_command_products)];
                    case 3:
                        result_product = _a.sent();
                        db.release();
                        ordersWithProduct = {
                            orderProduct: result_product.rows,
                            status: result.rows[0].status,
                            user_id: result.rows[0].user_id,
                            id: result.rows[0].id
                        };
                        return [2 /*return*/, ordersWithProduct];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("".concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    order.prototype.orderByUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, sql_command, result, sql_command_products, result_product, ordersWithProduct, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db = _a.sent();
                        sql_command = "SELECT * FROM orders WHERE user_id=".concat(id, " AND status=1");
                        return [4 /*yield*/, db.query(sql_command)];
                    case 2:
                        result = _a.sent();
                        console.log('in order by user      --------------------------');
                        sql_command_products = "SELECT * FROM ordersproducts WHERE order_id=".concat(result.rows[0].id);
                        return [4 /*yield*/, db.query(sql_command_products)];
                    case 3:
                        result_product = _a.sent();
                        db.release();
                        ordersWithProduct = {
                            orderProduct: result_product.rows,
                            status: result.rows[0].status,
                            user_id: result.rows[0].user_id,
                            id: result.rows[0].id
                        };
                        console.log(ordersWithProduct);
                        return [2 /*return*/, ordersWithProduct];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("".concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    order.prototype.completedOrdersByUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, sql_command, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db = _a.sent();
                        sql_command = "SELECT * FROM orders WHERE user_id=".concat(id, " AND status=3");
                        return [4 /*yield*/, db.query(sql_command)];
                    case 2:
                        result = _a.sent();
                        db.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    order.prototype.create = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var db, sql_command, result_1, sql_command_products_1, result_product, sql_command_get_products, result_get_product, ordersWithProduct, err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db = _a.sent();
                        sql_command = "INSERT INTO orders (user_id,status) VALUES (".concat(p.user_id, ",'").concat(p.status, "') RETURNING *");
                        return [4 /*yield*/, db.query(sql_command)];
                    case 2:
                        result_1 = _a.sent();
                        sql_command_products_1 = '';
                        p.orderProduct.forEach(function (e) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                sql_command_products_1 += "INSERT INTO ordersproducts (order_id,product_id,quantity,price) VALUES (".concat(result_1.rows[0].id, ",").concat(e.product_id, ",").concat(e.quantity, ",").concat(e.price, ") ;");
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, db.query(sql_command_products_1)];
                    case 3:
                        result_product = _a.sent();
                        sql_command_get_products = "SELECT * FROM ordersproducts WHERE order_id=".concat(result_1.rows[0].id, ";");
                        return [4 /*yield*/, db.query(sql_command_get_products)];
                    case 4:
                        result_get_product = _a.sent();
                        console.log(result_get_product.rows);
                        db.release();
                        ordersWithProduct = {
                            orderProduct: result_get_product.rows,
                            status: result_1.rows[0].status,
                            user_id: result_1.rows[0].user_id,
                            id: result_1.rows[0].id
                        };
                        return [2 /*return*/, ordersWithProduct];
                    case 5:
                        err_5 = _a.sent();
                        throw new Error("".concat(err_5));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    order.prototype.update = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var db, sql_command, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db = _a.sent();
                        sql_command = "UPDATE orders SET user_id = ".concat(p.user_id, ",status= '").concat(p.status, "' WHERE id = ").concat(p.id, " RETURNING *");
                        return [4 /*yield*/, db.query(sql_command)];
                    case 2:
                        result = _a.sent();
                        db.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("".concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    order.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, sql_command, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        db = _a.sent();
                        sql_command = "DELETE FROM orders WHERE id=".concat(id);
                        return [4 /*yield*/, db.query(sql_command)];
                    case 2:
                        result = _a.sent();
                        db.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("".concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    order.prototype.orderStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, enum_1.orderStatus];
                }
                catch (err) {
                    throw new Error("".concat(err));
                }
                return [2 /*return*/];
            });
        });
    };
    return order;
}());
exports.order = order;
