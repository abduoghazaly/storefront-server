"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const auth_middleware_1 = require("../helper/auth.middleware");
const orders_product_model_1 = require("../models/orders_product.model");
const cate = new orders_product_model_1.orderProduct();
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
            order_id: _req.body.order_id,
            product_id: _req.body.product_id,
            quantity: _req.body.quantity,
            price: _req.body.price
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
            order_id: _req.body.order_id,
            product_id: _req.body.product_id,
            quantity: _req.body.quantity,
            price: _req.body.price
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
    app.get("/orderProduct", auth_middleware_1.verifyAuthToken, index);
    app.get("/orderProduct/:id", auth_middleware_1.verifyAuthToken, show);
    app.post("/orderProduct", auth_middleware_1.verifyAuthToken, create);
    app.put("/orderProduct/:id", auth_middleware_1.verifyAuthToken, update);
    app.delete("/orderProduct/:id", auth_middleware_1.verifyAuthToken, deleted);
};
exports.categoryRoute = categoryRoute;
