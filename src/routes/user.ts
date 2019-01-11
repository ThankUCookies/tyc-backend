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
  [body("userName").exists(), body("password").exists()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const userName: string = req.body.userName;
      const password: string = req.body.password;

      if (await userBusinessAccess.authenticate(userName, password)) {
        res.json({ token: "some token" });
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
