import Express, { Request, Response } from "express";
import { verifyAuthToken } from "../helper/auth.middleware";
import { product, iProduct } from "../models/product.model";

const prod = new product();

const index = async (_req: Request, _res: Response) => {
  try {
    const result = await prod.index();
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const show = async (_req: Request, _res: Response) => {
  try {
    const result = await prod.show(+_req.params.id);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

const create = async (_req: Request, _res: Response) => {
  try {
    const proded: iProduct = {
      name: _req.body.name,
      description: _req.body.description,
      price: _req.body.price,
      category_id: _req.body.category_id,
    };

    const result = await prod.create(proded);
    _res.json(result);
  } catch (err ) {
    _res.status(400).send({
        message: (err as Error).message
     });
  }
};

const update = async (_req: Request, _res: Response) => {
  try {
    const proded: iProduct = {
      id: +_req.params.id,
      name: _req.body.name,
      description: _req.body.description,
      price: _req.body.price,
      category_id: _req.body.category_id,
    };

    const result = await prod.update(proded);
    _res.json(result);
  } catch (err ) {
    _res.status(400).send({
        message: (err as Error).message
     });
  }
};

const deleted = async (_req: Request, _res: Response) => {
  try {
    const result = await prod.delete(+_req.params.id);
    _res.json(result);
  } catch (err) {
    _res.status(400).send({
      message: (err as Error).message,
    });
  }
};

export const productRoute = (app: Express.Application) => {
  app.get("/product", verifyAuthToken, index);
  app.get("/product/:id", verifyAuthToken, show);
  app.post("/product", verifyAuthToken, create);
  app.put("/product/:id", verifyAuthToken, update);
  app.delete("/product/:id", verifyAuthToken, deleted);
};
