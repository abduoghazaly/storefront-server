"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    var TOKEN_SECRET = process.env.TOKEN_SECRET;
    try {
        if (req.headers.authorization) {
            var authorizationHeader = req.headers.authorization;
            var token = authorizationHeader.split(" ")[1];
            var decoded = jsonwebtoken_1["default"].verify(token, TOKEN_SECRET);
            next();
        }
        else {
            res.status(401).send("MISSING TOKEN");
        }
    }
    catch (error) {
        res.status(401).send("WRONG TOKEN");
    }
};
exports.verifyAuthToken = verifyAuthToken;
