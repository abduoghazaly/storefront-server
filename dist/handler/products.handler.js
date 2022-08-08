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
exports.__esModule = true;
exports.productRoute = void 0;
var auth_middleware_1 = require("../helper/auth.middleware");
var product_model_1 = require("../models/product.model");
var prod = new product_model_1.product();
var index = function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prod.index()];
            case 1:
                result = _a.sent();
                _res.json(result);
                return [2 /*return*/];
        }
    });
}); };
var show = function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prod.show(+_req.params.id)];
            case 1:
                result = _a.sent();
                _res.json(result);
                return [2 /*return*/];
        }
    });
}); };
var create = function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var proded, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                proded = {
                    name: _req.body.name,
                    description: _req.body.description,
                    price: _req.body.price,
                    category_id: _req.body.category_id
                };
                return [4 /*yield*/, prod.create(proded)];
            case 1:
                result = _a.sent();
                _res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                _res.status(400);
                _res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var proded, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                proded = {
                    id: +_req.params.id,
                    name: _req.body.name,
                    description: _req.body.description,
                    price: _req.body.price,
                    category_id: _req.body.category_id
                };
                return [4 /*yield*/, prod.update(proded)];
            case 1:
                result = _a.sent();
                _res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                _res.status(400);
                _res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleted = function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prod["delete"](+_req.params.id)];
            case 1:
                result = _a.sent();
                _res.json(result);
                return [2 /*return*/];
        }
    });
}); };
var productRoute = function (app) {
    app.get('/product', auth_middleware_1.verifyAuthToken, index);
    app.get('/product/:id', auth_middleware_1.verifyAuthToken, show);
    app.post('/product', auth_middleware_1.verifyAuthToken, create);
    app.put('/product/:id', auth_middleware_1.verifyAuthToken, update);
    app["delete"]('/product/:id', auth_middleware_1.verifyAuthToken, deleted);
};
exports.productRoute = productRoute;
