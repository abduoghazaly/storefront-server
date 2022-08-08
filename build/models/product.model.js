"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const database_1 = __importDefault(require("../database"));
class product {
    async index() {
        try {
            const db = await database_1.default.connect();
            const sql_command = "SELECT * FROM products";
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
            const sql_command = `SELECT * FROM products WHERE id=${id}`;
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
            const sql_command = `INSERT INTO products (name,description,price,category_id) VALUES ('${p.name}','${p.description}',${p.price},${p.category_id}) RETURNING *`;
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
            const sql_command = `UPDATE products SET name = '${p.name}',description = '${p.description}',price = ${p.price},category_id = ${p.category_id} WHERE id=${p.id} RETURNING *`;
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
            const sql_command = `DELETE FROM products WHERE id=${id} RETURNING *`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.product = product;
