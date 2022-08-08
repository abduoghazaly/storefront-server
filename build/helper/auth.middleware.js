"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    try {
        if (req.headers.authorization) {
            const authorizationHeader = req.headers.authorization;
            const token = authorizationHeader.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
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
