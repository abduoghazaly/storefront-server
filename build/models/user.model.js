"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
class user {
    async index() {
        try {
            const db = await database_1.default.connect();
            const sql_command = "SELECT id, firstName, lastName, email FROM users";
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
            const sql_command = `SELECT id, firstName, lastName, email FROM users WHERE id=${id}`;
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
            const hashedPassword = bcrypt_1.default.hashSync(p.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            p.password = hashedPassword;
            const db = await database_1.default.connect();
            const sql_command = `INSERT INTO users (firstName,lastName,email,password) VALUES ('${p.firstName}','${p.lastName}','${p.email}','${p.password}') RETURNING id,firstName,lastName,email`;
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
            const hashedPassword = bcrypt_1.default.hashSync(p.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            p.password = hashedPassword;
            const db = await database_1.default.connect();
            const sql_command = `UPDATE  users SET firstName = '${p.firstName}' ,lastName = '${p.lastName}',email = '${p.email}' ,password = '${p.password}' WHERE id=${p.id} RETURNING id,firstName,lastName,email`;
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
            const sql_command = `DELETE FROM users WHERE id=${id} RETURNING id,firstName,lastName,email`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async signin(p) {
        try {
            const db = await database_1.default.connect();
            const sql_command = `SELECT * FROM users WHERE email='${p.email}'`;
            const result = await db.query(sql_command);
            db.release();
            if (result.rows.length) {
                if (bcrypt_1.default.compareSync(p.password + BCRYPT_PASSWORD, result.rows[0].password)) {
                    result.rows[0].password = undefined;
                    let user = result.rows[0];
                    user.token = "token";
                    return user;
                }
                else {
                    throw new Error("Invalid email or password!");
                }
            }
            else {
                throw new Error("Invalid email or password!");
            }
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.user = user;
