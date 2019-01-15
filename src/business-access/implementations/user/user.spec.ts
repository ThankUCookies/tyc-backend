import { mockServices } from "../../../__mocks__/mockServices";

mockServices();

import jwt from "jsonwebtoken";
import serviceLocator from "../../../ioc/service-locator";
import TYPES from "../../../ioc/types";
import { IUserResourceAccess } from "../../../resource-access/contracts/user";
import { IUserBusinessAccess } from "../../contracts/user";
import { UserBusinessAccess } from "./user";

describe("UserBusinessAccess", () => {
  let userBusinessAccess: IUserBusinessAccess;
  let userName: string;
  let password: string;
  let userResourceAccess: IUserResourceAccess;

  beforeEach(() => {
    userName = "someone";
    password = "somepassword";
    userResourceAccess = serviceLocator.get<IUserResourceAccess>(
      TYPES.UserResourceAccess,
    );
    userBusinessAccess = new UserBusinessAccess(userResourceAccess);
  });

  describe("exists(userName)", () => {
    it("should call getUser on resource access with `userName`", () => {
      userResourceAccess.getUser = jest.fn();

      userBusinessAccess.exists(userName);

      expect(userResourceAccess.getUser).toHaveBeenCalledWith(userName);
    });
  });

  describe("authenticate(userName, password)", () => {
    it("should call getUser on resource access with `userName`", async () => {
      userResourceAccess.getUser = jest.fn();

      await userBusinessAccess.authenticate(userName, password);

      expect(userResourceAccess.getUser).toHaveBeenCalledWith(userName);
    });

    it("should return false when the userName or password is incorrect", async () => {
      userResourceAccess.getUser = jest.fn().mockResolvedValue(null);

      const token = await userBusinessAccess.authenticate(userName, password);

      expect(token).toBeFalsy();
    });

    it("should call jwt.sign with { userName }, secret, { expiresIn: 1d }", async () => {
      userResourceAccess.getUser = jest.fn().mockResolvedValue({
        userName,
        comparePassword(candidatePassword: string) {
          return true;
        },
      });

      jwt.sign = jest.fn();

      await userBusinessAccess.authenticate(userName, password);

      expect(jwt.sign).toHaveBeenCalledWith({ userName }, "secret", {
        expiresIn: "1d",
      });
    });
  });
});
