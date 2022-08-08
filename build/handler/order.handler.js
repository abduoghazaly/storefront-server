"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const auth_middleware_1 = require("../helper/auth.middleware");
const order_model_1 = require("../models/order.model");
const orders = new order_model_1.order();
const index = async (_req, _res) => {
    const result = await orders.index();
    _res.json(result);
};
const show = async (_req, _res) => {
    const result = await orders.show(+_req.params.id);
    _res.json(result);
};
const orderByUser = async (_req, _res) => {
    const result = await orders.orderByUser(+_req.params.id);
    _res.json(result);
};
const complatedOrdersByUser = async (_req, _res) => {
    const result = await orders.completedOrdersByUser(+_req.params.id);
    _res.json(result);
};
const create = async (_req, _res) => {
    try {
        const ordered = {
            user_id: _req.body.user_id,
            status: _req.body.status,
            orderProduct: _req.body.orderProduct
        };
        const result = await orders.create(ordered);
        _res.json(result);
    }
    catch (err) {
        _res.status(400);
        _res.json(err);
    }
};
const update = async (_req, _res) => {
    try {
        const ordered = {
            id: +_req.params.id,
            user_id: _req.body.user_id,
            status: _req.body.status,
            orderProduct: _req.body.orderProduct
        };
        const result = await orders.update(ordered);
        _res.json(result);
    }
    catch (err) {
        _res.status(400);
        _res.json(err);
    }
};
const deleted = async (_req, _res) => {
    const result = await orders.delete(+_req.params.id);
    _res.json(result);
};
const orderRoute = (app) => {
    app.get('/order', auth_middleware_1.verifyAuthToken, index);
    app.get('/order/:id', auth_middleware_1.verifyAuthToken, show);
    app.get('/orderByUser/:id', auth_middleware_1.verifyAuthToken, orderByUser);
    app.get('/complatedOrdersByUser/:id', auth_middleware_1.verifyAuthToken, complatedOrdersByUser);
    app.post('/order', auth_middleware_1.verifyAuthToken, create);
    app.put('/order/:id', auth_middleware_1.verifyAuthToken, update);
    app.delete('/order/:id', auth_middleware_1.verifyAuthToken, deleted);
};
exports.orderRoute = orderRoute;
