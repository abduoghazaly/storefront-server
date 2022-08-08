import { Request, Response, RequestHandler } from "express";
import Jwt from "jsonwebtoken";

export const verifyAuthToken: RequestHandler = (
  req: Request,
  res: Response,
  next
) => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

  try {
    if (req.headers.authorization) {
      const authorizationHeader = req.headers.authorization as string;
      const token = authorizationHeader.split(" ")[1];
      const decoded = Jwt.verify(token, TOKEN_SECRET);
      next();
    } else {
      res.status(401).send("MISSING TOKEN");
    }
  } catch (error) {
    res.status(401).send("WRONG TOKEN");
  }
};
