import Express, { Request, Response } from "express";
import { user, iUser, iSignin } from "../models/user.model";
import Jwt  from "jsonwebtoken";
import { verifyAuthToken } from "../helper/auth.middleware";


const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
const users = new user();

const index = async (_req: Request, _res: Response) => {
  const result = await users.index();
  _res.json(result);
};

const show = async (_req: Request, _res: Response) => {
  const result = await users.show(+_req.params.id);
  _res.json(result);
};

const create = async (_req: Request, _res: Response) => {
  try {
    const newUser: iUser = {
      firstName: _req.body.firstName,
      lastName: _req.body.lastName,
      email: _req.body.email,
      password: _req.body.password
    };

    const result = await users.create(newUser);
    const token = Jwt.sign(result, TOKEN_SECRET)
    _res.json({token});
  } catch (err ) {
    _res.status(400).send({
        message: (err as Error).message
     });
  }
};

const update = async (_req: Request, _res: Response) => {
  try {
    const newUser: iUser = {
      id: +_req.params.id,
      firstName: _req.body.firstName,
      lastName: _req.body.lastName,
      email: _req.body.email,
      password: _req.body.password
    };

    const result = await users.update(newUser);
    const token = Jwt.sign(result, TOKEN_SECRET)
    _res.json({token});
  } catch (err ) {
    _res.status(400).send({
        message: (err as Error).message
     });
  }
};

const deleted = async (_req: Request, _res: Response) => {
  const result = await users.delete(+_req.params.id);
  _res.json(result);
};

const signin = async (_req: Request, _res: Response) => {
  try {
    const usered: iSignin = {
      email: _req.body.email,
      password: _req.body.password,
    };
    const result = await users.signin(usered);
    const token = Jwt.sign(result, TOKEN_SECRET)
    _res.json({token});
  } catch (err) {
    console.log(err)
    _res.status(400).send({
        message: (err as Error).message
     });
  }
};

export const userRoute = (app: Express.Application) => {
  app.get("/user",verifyAuthToken, index);
  app.get("/user/:id",verifyAuthToken, show);
  app.post("/user", create);
  app.put("/user/:id", verifyAuthToken, update);
  app.delete("/user/:id", verifyAuthToken, deleted);
  app.post("/signin", signin);
};
