import Express, { Request, Response } from "express";
import { verifyAuthToken } from "../helper/auth.middleware";
import { order, iOrder } from "../models/order.model";

const orders = new order();

const index = async (_req: Request, _res: Response) => {
  try {
    const result = await orders.index();
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const show = async (_req: Request, _res: Response) => {
  try {
    const result = await orders.show(+_req.params.id);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const orderByUser = async (_req: Request, _res: Response) => {
  try {
    const result = await orders.orderByUser(+_req.params.id);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const complatedOrdersByUser = async (_req: Request, _res: Response) => {
  try {
    const result = await orders.completedOrdersByUser(+_req.params.id);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const create = async (_req: Request, _res: Response) => {
  try {
    const ordered: iOrder = {
      user_id: _req.body.user_id,
      status: _req.body.status,
      orderProduct: _req.body.orderProduct,
    };
    const result = await orders.create(ordered);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const update = async (_req: Request, _res: Response) => {
  try {
    const ordered: iOrder = {
      id: +_req.params.id,
      user_id: _req.body.user_id,
      status: _req.body.status,
      orderProduct: _req.body.orderProduct,
    };
    const result = await orders.update(ordered);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const deleted = async (_req: Request, _res: Response) => {
  try {
    const result = await orders.delete(+_req.params.id);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

export const orderRoute = (app: Express.Application) => {
  app.get("/order", verifyAuthToken, index);
  app.get("/order/:id", verifyAuthToken, show);
  app.get("/orderByUser/:id", verifyAuthToken, orderByUser);
  app.get("/complatedOrdersByUser/:id", verifyAuthToken, complatedOrdersByUser);
  app.post("/order", verifyAuthToken, create);
  app.put("/order/:id", verifyAuthToken, update);
  app.delete("/order/:id", verifyAuthToken, deleted);
};
