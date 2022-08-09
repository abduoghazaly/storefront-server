import Express, { Request, Response } from "express";
import { verifyAuthToken } from "../helper/auth.middleware";
import { orderProduct, iOrderProduct } from "../models/orders_product.model";

const cate = new orderProduct();

const index = async (_req: Request, _res: Response) => {
  try {
    const result = await cate.index();
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const show = async (_req: Request, _res: Response) => {
  try {
    const result = await cate.show(+_req.params.id);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const create = async (_req: Request, _res: Response) => {
  try {
    const cateed: iOrderProduct = {
      order_id: _req.body.order_id,
      product_id: _req.body.product_id,
      quantity: _req.body.quantity,
      price: _req.body.price,
    };

    const result = await cate.create(cateed);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};
const update = async (_req: Request, _res: Response) => {
  try {
    const cateed: iOrderProduct = {
      id: +_req.params.id,
      order_id: _req.body.order_id,
      product_id: _req.body.product_id,
      quantity: _req.body.quantity,
      price: _req.body.price,
    };

    const result = await cate.update(cateed);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const deleted = async (_req: Request, _res: Response) => {
  try {
    const result = await cate.delete(+_req.params.id);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

export const orderProductRoute = (app: Express.Application) => {
  app.get("/orderProduct", verifyAuthToken, index);
  app.get("/orderProduct/:id", verifyAuthToken, show);
  app.post("/orderProduct", verifyAuthToken, create);
  app.put("/orderProduct/:id", verifyAuthToken, update);
  app.delete("/orderProduct/:id", verifyAuthToken, deleted);
};
