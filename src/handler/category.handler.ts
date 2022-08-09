import Express, { Request, Response } from "express";
import { verifyAuthToken } from "../helper/auth.middleware";
import { category, iCategory } from "../models/category.model";

const cate = new category();

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
    const cateed: iCategory = {
      name: _req.body.name,
      description: _req.body.description,
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
    const cateed: iCategory = {
      id: +_req.params.id,
      name: _req.body.name,
      description: _req.body.description,
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

export const categoryRoute = (app: Express.Application) => {
  app.get("/category", verifyAuthToken, index);
  app.get("/category/:id", verifyAuthToken, show);
  app.post("/category", verifyAuthToken, create);
  app.put("/category/:id", verifyAuthToken, update);
  app.delete("/category/:id", verifyAuthToken, deleted);
};
