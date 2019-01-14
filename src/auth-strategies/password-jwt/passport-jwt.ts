import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUserBusinessAccess } from "../../business-access/contracts/user";
import serviceLocator from "../../ioc/service-locator";
import TYPES from "../../ioc/types";
import { User } from "../../models/user";

export const JwtVerifyCallback = (
  userBusinessAccessObj: IUserBusinessAccess,
) => {
  return async (payload: any, done: any) => {
    const { userName } = payload;

    try {
      const user: User | null = await userBusinessAccessObj.exists(userName);

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  };
};

const userBusinessAccess: IUserBusinessAccess = serviceLocator.get<
  IUserBusinessAccess
>(TYPES.UserBusinessAccess);

// TODO: seperate out jwt secret into env variable
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    JwtVerifyCallback(userBusinessAccess),
  ),
);

export const PassportJwtStrategy = passport;
