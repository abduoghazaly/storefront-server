"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = require("../helper/auth.middleware");
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const users = new user_model_1.user();
const index = async (_req, _res) => {
    const result = await users.index();
    _res.json(result);
};
const show = async (_req, _res) => {
    const result = await users.show(+_req.params.id);
    _res.json(result);
};
const create = async (_req, _res) => {
    try {
        const newUser = {
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            email: _req.body.email,
            password: _req.body.password
        };
        const result = await users.create(newUser);
        const token = jsonwebtoken_1.default.sign(result, TOKEN_SECRET);
        _res.json({ token });
    }
    catch (err) {
        _res.status(400).send({
            message: err.message
        });
    }
};
const update = async (_req, _res) => {
    try {
        const newUser = {
            id: +_req.params.id,
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            email: _req.body.email,
            password: _req.body.password
        };
        const result = await users.update(newUser);
        const token = jsonwebtoken_1.default.sign(result, TOKEN_SECRET);
        _res.json({ token });
    }
    catch (err) {
        _res.status(400).send({
            message: err.message
        });
    }
};
const deleted = async (_req, _res) => {
    const result = await users.delete(+_req.params.id);
    _res.json(result);
};
const signin = async (_req, _res) => {
    try {
        const usered = {
            email: _req.body.email,
            password: _req.body.password,
        };
        const result = await users.signin(usered);
        const token = jsonwebtoken_1.default.sign(result, TOKEN_SECRET);
        _res.json({ token });
    }
    catch (err) {
        console.log(err);
        _res.status(400).send({
            message: err.message
        });
    }
};
const userRoute = (app) => {
    app.get("/user", auth_middleware_1.verifyAuthToken, index);
    app.get("/user/:id", auth_middleware_1.verifyAuthToken, show);
    app.post("/user", create);
    app.put("/user/:id", auth_middleware_1.verifyAuthToken, update);
    app.delete("/user/:id", auth_middleware_1.verifyAuthToken, deleted);
    app.post("/signin", signin);
};
exports.userRoute = userRoute;
