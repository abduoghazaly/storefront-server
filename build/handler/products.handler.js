"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const auth_middleware_1 = require("../helper/auth.middleware");
const product_model_1 = require("../models/product.model");
const prod = new product_model_1.product();
const index = async (_req, _res) => {
    const result = await prod.index();
    _res.json(result);
};
const show = async (_req, _res) => {
    const result = await prod.show(+_req.params.id);
    _res.json(result);
};
const create = async (_req, _res) => {
    try {
        const proded = {
            name: _req.body.name,
            description: _req.body.description,
            price: _req.body.price,
            category_id: _req.body.category_id,
        };
        const result = await prod.create(proded);
        _res.json(result);
    }
    catch (err) {
        _res.status(400);
        _res.json(err);
    }
};
const update = async (_req, _res) => {
    try {
        const proded = {
            id: +_req.params.id,
            name: _req.body.name,
            description: _req.body.description,
            price: _req.body.price,
            category_id: _req.body.category_id,
        };
        const result = await prod.update(proded);
        _res.json(result);
    }
    catch (err) {
        _res.status(400);
        _res.json(err);
    }
};
const deleted = async (_req, _res) => {
    const result = await prod.delete(+_req.params.id);
    _res.json(result);
};
const productRoute = (app) => {
    app.get('/product', auth_middleware_1.verifyAuthToken, index);
    app.get('/product/:id', auth_middleware_1.verifyAuthToken, show);
    app.post('/product', auth_middleware_1.verifyAuthToken, create);
    app.put('/product/:id', auth_middleware_1.verifyAuthToken, update);
    app.delete('/product/:id', auth_middleware_1.verifyAuthToken, deleted);
};
exports.productRoute = productRoute;
