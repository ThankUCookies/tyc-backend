import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUserBusinessAccess } from "../business-access/contracts/user";
import serviceLocator from "../ioc/service-locator";
import TYPES from "../ioc/types";
import { User } from "../models/user";

const userBusinessAccess: IUserBusinessAccess = serviceLocator.get<
  IUserBusinessAccess
>(TYPES.UserBusinessAccess);

export const JwtVerifyCallback = async (payload: any, done: any) => {
  const userName = payload;

  try {
    const user: User | null = await userBusinessAccess.exists(userName);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
};

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "secret",
    },
    JwtVerifyCallback,
  ),
);

export const PassportJwtStrategy = passport;
