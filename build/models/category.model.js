"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const database_1 = __importDefault(require("../database"));
class category {
    async index() {
        try {
            const db = await database_1.default.connect();
            const sql_command = "SELECT * FROM categories";
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
            const sql_command = `SELECT * FROM categories WHERE id=${id}`;
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
            const sql_command = `INSERT INTO categories (name,description) VALUES ('${p.name}','${p.description}') RETURNING *`;
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
            const sql_command = `UPDATE categories SET name='${p.name}',description='${p.description}' WHERE id=${p.id} RETURNING *`;
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
            const sql_command = `DELETE FROM categories WHERE id=${id} RETURNING *`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.category = category;
