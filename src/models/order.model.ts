import db_client  from "../database";
import { orderStatus } from "../helper/enum";
import { iOrderProduct } from "./orders_product.model";

export interface iOrder{
    id?:number,
    user_id:number,
    status:number,
    orderProduct:iOrderProduct[]
}

export class order {
    async index(): Promise<iOrder[]> {
      try {
        const db = await db_client.connect();
        const sql_command = "SELECT * FROM orders";
        const result = await db.query(sql_command);
        db.release();
        return result.rows;
      } catch (err) {
        throw new Error(`${err}`);
      }
    }
  
    async show(id: number): Promise<iOrder> {
      try {
        const db = await db_client.connect();
        const sql_command = `SELECT * FROM orders WHERE id=${id}`;
        const result = await db.query(sql_command);
        const sql_command_products= `SELECT * FROM ordersproducts WHERE order_id=${id}`;
        const result_product = await db.query(sql_command_products);
        db.release();
        const ordersWithProduct : iOrder = {
            orderProduct: result_product.rows,
            status: result.rows[0].status,
            user_id: result.rows[0].user_id,
            id:result.rows[0].id
        }
        return ordersWithProduct;
      } catch (err) {
        throw new Error(`${err}`);
      }
    }

    async orderByUser(id: number): Promise<iOrder> {
      try {
        const db = await db_client.connect();
        const sql_command = `SELECT * FROM orders WHERE user_id=${id} AND status=1`;
        const result = await db.query(sql_command);
        const sql_command_products= `SELECT * FROM ordersproducts WHERE order_id=${result.rows[0].id}`;
        const result_product = await db.query(sql_command_products);
        db.release();
        const ordersWithProduct : iOrder = {
            orderProduct: result_product.rows,
            status: result.rows[0].status,
            user_id: result.rows[0].user_id,
            id:result.rows[0].id
        }
        return ordersWithProduct;
      } catch (err) {
        throw new Error(`${err}`);
      }
    }

    async completedOrdersByUser(id: number): Promise<iOrder[]> {
      try {
        const db = await db_client.connect();
        const sql_command = `SELECT * FROM orders WHERE user_id=${id} AND status=3`;
        const result = await db.query(sql_command);
        db.release();
        return result.rows;
      } catch (err) {
        throw new Error(`${err}`);
      }
    }
  
    async create(p:iOrder):Promise<iOrder>{
      try {
          const db = await db_client.connect();
          const sql_command = `INSERT INTO orders (user_id,status) VALUES (${p.user_id},'${p.status}') RETURNING *`;
          const result = await db.query(sql_command);
          let sql_command_products: string =''
            p.orderProduct.forEach(async (e)=>{
                sql_command_products += `INSERT INTO ordersproducts (order_id,product_id,quantity,price) VALUES (${result.rows[0].id},${e.product_id},${e.quantity},${e.price}) ;`;
            })
            const result_product = await db.query(sql_command_products);
            const sql_command_get_products = `SELECT * FROM ordersproducts WHERE order_id=${result.rows[0].id};`
            const result_get_product = await db.query(sql_command_get_products);
            console.log(result_get_product.rows)
            db.release();
            const ordersWithProduct : iOrder = {
                orderProduct: result_get_product.rows,
                status: result.rows[0].status,
                user_id: result.rows[0].user_id,
                id:result.rows[0].id
            }
          return ordersWithProduct;
        } catch (err) {
          throw new Error(`${err}`);
        }
    }

    async update(p:iOrder):Promise<iOrder>{
      try {
          const db = await db_client.connect();
          const sql_command = `UPDATE orders SET user_id = ${p.user_id},status= '${p.status}' WHERE id = ${p.id} RETURNING *`;
          const result = await db.query(sql_command);
            db.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`${err}`);
        }
    }

    async delete(id:number): Promise<iOrder> {
      try {
        const db = await db_client.connect();
        const sql_command = `DELETE FROM orders WHERE id=${id}`;
        const result = await db.query(sql_command);
        db.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`${err}`);
      }
    }

    async orderStatus(): Promise<object> {
      try {
        return orderStatus;
      } catch (err) {
        throw new Error(`${err}`);
      }
    }

  }
  