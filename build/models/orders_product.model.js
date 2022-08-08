"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProduct = void 0;
const database_1 = __importDefault(require("../database"));
class orderProduct {
    async index() {
        try {
            const db = await database_1.default.connect();
            const sql_command = "SELECT * FROM ordersproducts";
            const result = await db.query(sql_command);
            db.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async show(id) {
        try {
            const db = await database_1.default.connect();
            const sql_command = `SELECT * FROM ordersproducts WHERE id=${id}`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(p) {
        try {
            const db = await database_1.default.connect();
            const sql_command = `INSERT INTO ordersproducts (order_id,product_id,quantity,price) VALUES (${p.order_id},${p.product_id},${p.quantity},${p.price}) RETURNING *`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async update(p) {
        try {
            const db = await database_1.default.connect();
            const sql_command = `UPDATE ordersproducts SET order_id = ${p.order_id},product_id = ${p.product_id},quantity = ${p.quantity},price = ${p.price}) WHERE id=${p.id} RETURNING *`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async delete(id) {
        try {
            const db = await database_1.default.connect();
            const sql_command = `DELETE FROM ordersproducts WHERE id=${id} RETURNING *`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.orderProduct = orderProduct;
