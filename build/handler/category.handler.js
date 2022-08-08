"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const auth_middleware_1 = require("../helper/auth.middleware");
const category_model_1 = require("../models/category.model");
const cate = new category_model_1.category();
const index = async (_req, _res) => {
    const result = await cate.index();
    _res.json(result);
};
const show = async (_req, _res) => {
    const result = await cate.show(+_req.params.id);
    _res.json(result);
};
const create = async (_req, _res) => {
    try {
        const cateed = {
            name: _req.body.name,
            description: _req.body.description,
        };
        const result = await cate.create(cateed);
        _res.json(result);
    }
    catch (err) {
        _res.status(400);
        _res.json(err);
    }
};
const update = async (_req, _res) => {
    try {
        const cateed = {
            id: +_req.params.id,
            name: _req.body.name,
            description: _req.body.description,
        };
        const result = await cate.update(cateed);
        _res.json(result);
    }
    catch (err) {
        _res.status(400);
        _res.json(err);
    }
};
const deleted = async (_req, _res) => {
    const result = await cate.delete(+_req.params.id);
    _res.json(result);
};
const categoryRoute = (app) => {
    app.get("/category", auth_middleware_1.verifyAuthToken, index);
    app.get("/category/:id", auth_middleware_1.verifyAuthToken, show);
    app.post("/category", auth_middleware_1.verifyAuthToken, create);
    app.put("/category/:id", auth_middleware_1.verifyAuthToken, update);
    app.delete("/category/:id", auth_middleware_1.verifyAuthToken, deleted);
};
exports.categoryRoute = categoryRoute;
