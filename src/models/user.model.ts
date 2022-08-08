import db_client from "../database";
import bcrypt from "bcrypt";

const BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS as string;

export interface iUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
}

export interface iSignin {
  email: string;
  password: string;
}

export class user {
  async index(): Promise<iUser[]> {
    try {
      const db = await db_client.connect();
      const sql_command = "SELECT id, firstName, lastName, email FROM users";
      const result = await db.query(sql_command);
      db.release();
      return result.rows;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: number): Promise<iUser> {
    try {
      const db = await db_client.connect();
      const sql_command = `SELECT id, firstName, lastName, email FROM users WHERE id=${id}`;
      const result = await db.query(sql_command);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(p: iUser): Promise<iUser> {
    try {
      const hashedPassword = bcrypt.hashSync(
        p.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS)
      );

      p.password = hashedPassword;
      const db = await db_client.connect();
      const sql_command = `INSERT INTO users (firstName,lastName,email,password) VALUES ('${p.firstName}','${p.lastName}','${p.email}','${p.password}') RETURNING id,firstName,lastName,email`;
      const result = await db.query(sql_command);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async update(p: iUser): Promise<iUser> {
    try {
      const hashedPassword = bcrypt.hashSync(
        p.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS)
      );

      p.password = hashedPassword;
      const db = await db_client.connect();
      const sql_command = `UPDATE  users SET firstName = '${p.firstName}' ,lastName = '${p.lastName}',email = '${p.email}' ,password = '${p.password}' WHERE id=${p.id} RETURNING id,firstName,lastName,email`;
      const result = await db.query(sql_command);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async delete(id: number): Promise<iUser> {
    try {
      const db = await db_client.connect();
      const sql_command = `DELETE FROM users WHERE id=${id} RETURNING id,firstName,lastName,email`;
      const result = await db.query(sql_command);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }  


  async signin(p: iSignin): Promise<iUser> {
    try {
      const db = await db_client.connect();
      const sql_command = `SELECT * FROM users WHERE email='${p.email}'`;
      const result = await db.query(sql_command);
      db.release();
      if(result.rows.length){
        if (bcrypt.compareSync( p.password + BCRYPT_PASSWORD, result.rows[0].password)) {
          result.rows[0].password = undefined;
          let user = result.rows[0] as iUser;

          user.token = "token";
          return user;
        } else {
          throw new Error("Invalid email or password!");
        }

      }else{
        throw new Error("Invalid email or password!");
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
