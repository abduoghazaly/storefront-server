"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { DB_URL, DB_NAME, DB_USER, DB_PASSWORD, DB_NAME_TEST, ENV } = process.env;
let db_client = new pg_1.Pool();
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
exports.default = db_client;
/*
CREATE TABLE products ( id SERIAL PRIMARY KEY, name VARCHAR(60), description VARCHAR(150), price DECIMAL, category_id integer);
CREATE TABLE orders ( id SERIAL PRIMARY KEY, status VARCHAR(60), user_id integer);
CREATE TABLE ordersproducts ( id SERIAL PRIMARY KEY, order_id integer , product_id integer , quantity DECIMAL , price DECIMAL);
CREATE TABLE categories ( id SERIAL PRIMARY KEY, name VARCHAR(60), description VARCHAR(150));
*/ 
