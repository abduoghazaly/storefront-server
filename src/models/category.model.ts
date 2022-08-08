 import db_client from "../database";

 export interface iCategory{
    id?:number,
    name:string,
    description:string
}

export class category{
    async index(): Promise<iCategory[]> {
        try {
          const db = await db_client.connect();
          const sql_command = "SELECT * FROM categories";
          const result = await db.query(sql_command);
          db.release();
          return result.rows;
        } catch (err) {
          throw new Error(`${err}`);
        }
      }
    
      async show(id: number): Promise<iCategory> {
        try {
          const db = await db_client.connect();
          const sql_command = `SELECT * FROM categories WHERE id=${id}`;
          const result = await db.query(sql_command);
          db.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`${err}`);
        }
      }
    
      async create(p:iCategory):Promise<iCategory>{
        try {
            const db = await db_client.connect();
            const sql_command = `INSERT INTO categories (name,description) VALUES ('${p.name}','${p.description}') RETURNING *`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
          } catch (err) {
            throw new Error(`${err}`);
          }
      }

      async update(p:iCategory):Promise<iCategory>{
        try {
            const db = await db_client.connect();
            const sql_command = `UPDATE categories SET name='${p.name}',description='${p.description}' WHERE id=${p.id} RETURNING *`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
          } catch (err) {
            throw new Error(`${err}`);
          }
      }

      async delete(id: number): Promise<iCategory> {
        try {
          const db = await db_client.connect();
          const sql_command = `DELETE FROM categories WHERE id=${id} RETURNING *`;
          const result = await db.query(sql_command);
          db.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`${err}`);
        }
      }

}