import db_client from "../database";

export interface iOrderProduct{
    id?:number,
    order_id:number,
    product_id:number,
    quantity:number,
    price:number
}


export class orderProduct{
    async index(): Promise<iOrderProduct[]> {
        try {
          const db = await db_client.connect();
          const sql_command = "SELECT * FROM ordersproducts";
          const result = await db.query(sql_command);
          db.release();
          return result.rows;
        } catch (err) {
          throw new Error(`${err}`);
        }
      }
    
      async show(id: number): Promise<iOrderProduct> {
        try {
          const db = await db_client.connect();
          const sql_command = `SELECT * FROM ordersproducts WHERE id=${id}`;
          const result = await db.query(sql_command);
          db.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`${err}`);
        }
      }
    
      async create(p:iOrderProduct):Promise<iOrderProduct>{
        try {
            const db = await db_client.connect();
            const sql_command = `INSERT INTO ordersproducts (order_id,product_id,quantity,price) VALUES (${p.order_id},${p.product_id},${p.quantity},${p.price}) RETURNING *`;
            const result = await db.query(sql_command);
            db.release();
            return result.rows[0];
          } catch (err) {
            throw new Error(`${err}`);
          }
      }

      async update(p:iOrderProduct):Promise<iOrderProduct>{
        try {
            const db = await db_client.connect();
            const sql_command = `UPDATE ordersproducts SET order_id=${p.order_id},product_id=${p.product_id},quantity=${p.quantity},price=${p.price} WHERE id=${p.id} RETURNING *`;
            const result = await db.query(sql_command);
          
            db.release();
            return result.rows[0];
          } catch (err) {
            throw new Error(`${err}`);
          }
      }

      async delete(id: number): Promise<iOrderProduct> {
        try {
          const db = await db_client.connect();
          const sql_command = `DELETE FROM ordersproducts WHERE id=${id} RETURNING *`;
          const result = await db.query(sql_command);
          db.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`${err}`);
        }
      }

}