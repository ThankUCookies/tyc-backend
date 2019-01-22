import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator/check";
import { IUserBusinessAccess } from "../business-access/contracts/user";
import serviceLocator from "../ioc/service-locator";
import TYPES from "../ioc/types";

const userRoute = express.Router();
const userBusinessAccess: IUserBusinessAccess = serviceLocator.get<
  IUserBusinessAccess
>(TYPES.UserBusinessAccess);

userRoute.post(
  "/login",
  [body("userName").exists()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const userName: string = req.body.userName;
      const token: string | boolean = await userBusinessAccess.authenticate(
        userName,
      );
      if (token) {
        res.json({ token });
      } else {
        res.status(401);
        res.send();
      }
    } else {
      res.json({
        errors: errors.array(),
      });
    }
  },
);

export default userRoute;
