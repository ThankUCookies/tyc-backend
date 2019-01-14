import { mockServices } from "../../../__mocks__/mockServices";

mockServices();

import { IUserBusinessAccess } from "../../business-access/contracts/user";
import serviceLocator from "../../ioc/service-locator";
import TYPES from "../../ioc/types";
import { JwtVerifyCallback } from "./passport-jwt";

describe("PassportJwtStrategy", () => {
  let payload: any;
  let user: any;
  let err: any;
  let userBusinessAccess: IUserBusinessAccess;

  beforeEach(() => {
    payload = { userName: "someone" };
    user = { userName: "someone", password: "somepassword" };
    err = { error: "some error" };
    userBusinessAccess = serviceLocator.get<IUserBusinessAccess>(
      TYPES.UserBusinessAccess,
    );
  });

  it("should call exists method on userBusinessAccess", async () => {
    userBusinessAccess.exists = jest.fn();
    const verifyCallback = JwtVerifyCallback(userBusinessAccess);

    await verifyCallback(payload, () => {
      return null;
    });

    expect(userBusinessAccess.exists).toHaveBeenCalledWith(payload.userName);
  });

  it("it should call done(null, user) when the user exists", async () => {
    userBusinessAccess.exists = jest.fn().mockResolvedValue(user);
    const verifyCallback = JwtVerifyCallback(userBusinessAccess);
    const callback = jest.fn();

    await verifyCallback(payload, callback);

    expect(callback).toHaveBeenCalledWith(null, user);
  });

  it("it should call done(null, false) when the user does not exists", async () => {
    userBusinessAccess.exists = jest.fn().mockResolvedValue(null);
    const verifyCallback = JwtVerifyCallback(userBusinessAccess);
    const callback = jest.fn();

    await verifyCallback(payload, callback);

    expect(callback).toHaveBeenCalledWith(null, false);
  });

  it("it should call done(err, false) when there is an error", async () => {
    userBusinessAccess.exists = jest.fn().mockRejectedValue(err);
    const verifyCallback = JwtVerifyCallback(userBusinessAccess);
    const callback = jest.fn();

    await verifyCallback(payload, callback);

    expect(callback).toHaveBeenCalledWith(err, false);
  });
});
