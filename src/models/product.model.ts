import db_client  from "../database";

export interface iProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
}

export class product {
  async index(): Promise<iProduct[]> {
    try {
      const db = await db_client.connect();
      const sql_command = "SELECT * FROM products";
      const result = await db.query(sql_command);
      db.release();
      return result.rows;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: number): Promise<iProduct> {
    try {
      const db = await db_client.connect();
      const sql_command = `SELECT * FROM products WHERE id=${id}`;
      const result = await db.query(sql_command);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(p:iProduct):Promise<iProduct>{
    try {
        const db = await db_client.connect();
        const sql_command = `INSERT INTO products (name,description,price,category_id) VALUES ('${p.name}','${p.description}',${p.price},${p.category_id}) RETURNING *`;
        const result = await db.query(sql_command);
        db.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`${err}`);
      }
  }

  async update(p:iProduct):Promise<iProduct>{
    try {
        const db = await db_client.connect();
        const sql_command = `UPDATE products SET name = '${p.name}',description = '${p.description}',price = ${p.price},category_id = ${p.category_id} WHERE id=${p.id} RETURNING *`;
        const result = await db.query(sql_command);
        db.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`${err}`);
      }
  }


  async delete(id: number): Promise<iProduct> {
    try {
      const db = await db_client.connect();
      const sql_command = `DELETE FROM products WHERE id=${id} RETURNING *`;
      const result = await db.query(sql_command);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

}
