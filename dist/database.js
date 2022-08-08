"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, DB_URL = _a.DB_URL, DB_NAME = _a.DB_NAME, DB_USER = _a.DB_USER, DB_PASSWORD = _a.DB_PASSWORD, DB_NAME_TEST = _a.DB_NAME_TEST, ENV = _a.ENV;
var db_client = new pg_1.Pool();
if (ENV === 'test') {
    db_client = new pg_1.Pool({
        host: DB_URL,
        database: DB_NAME_TEST,
        user: DB_USER,
        password: DB_PASSWORD
    });
}
if (ENV === 'dev') {
    db_client = new pg_1.Pool({
        host: DB_URL,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD
    });
}
exports["default"] = db_client;
/*
CREATE TABLE products ( id SERIAL PRIMARY KEY, name VARCHAR(60), description VARCHAR(150), price DECIMAL, category_id integer);
CREATE TABLE orders ( id SERIAL PRIMARY KEY, status VARCHAR(60), user_id integer);
CREATE TABLE ordersproducts ( id SERIAL PRIMARY KEY, order_id integer , product_id integer , quantity DECIMAL , price DECIMAL);
CREATE TABLE categories ( id SERIAL PRIMARY KEY, name VARCHAR(60), description VARCHAR(150));
*/ 
