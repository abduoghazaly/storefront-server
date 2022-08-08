"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const products_handler_1 = require("./handler/products.handler");
const order_handler_1 = require("./handler/order.handler");
const category_handler_1 = require("./handler/category.handler");
const user_handler_1 = require("./handler/user.handler");
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, products_handler_1.productRoute)(app);
(0, order_handler_1.orderRoute)(app);
(0, category_handler_1.categoryRoute)(app);
(0, user_handler_1.userRoute)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
