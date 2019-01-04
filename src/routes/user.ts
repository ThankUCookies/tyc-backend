import express, { Request, Response } from "express";

const userRoute = express.Router();

userRoute.post("/login", (req: Request, res: Response) => {
  res.send("Login route!");
});

export default userRoute;
