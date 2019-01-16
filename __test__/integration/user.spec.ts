import bcrypt from "bcrypt";
import serviceLocator from "../../src/ioc/service-locator";
import TYPES from "../../src/ioc/types";
import { User } from "../../src/models/user";
import IDatabase from "../../src/resource-access/contracts/db";

describe("User", () => {
  let user: User;

  beforeAll(() => {
    const db = serviceLocator.get<IDatabase>(TYPES.Database);
    db.connect();
  });

  beforeEach(async () => {
    user = new User();
  });

  describe("get passwordHash()", () => {
    it("should call `getDataValue('passwordHash') while getting passwordHash`", () => {
      user.getDataValue = jest.fn();
      /* tslint:disable:no-unused-expression */
      user.passwordHash;

      expect(user.getDataValue).toHaveBeenCalledWith("passwordHash");
    });
  });

  describe("set passwordHash()", () => {
    it("should call `bcrypt.hashSync('passwordHash', value)` when setting passwordHash", () => {
      const newPassword = "some hash";
      bcrypt.hashSync = jest.fn();

      user.passwordHash = newPassword;

      expect(bcrypt.hashSync).toHaveBeenCalledWith(newPassword, 10);
    });

    it("should call `setDataValue('passwordHash', newHash)` when setting passwordHash", () => {
      const newPassword = "some password";
      const newPasswordHash = "some password hash";
      bcrypt.hashSync = jest.fn().mockReturnValue(newPasswordHash);
      user.setDataValue = jest.fn();

      user.passwordHash = newPassword;

      expect(user.setDataValue).toHaveBeenCalledWith(
        "passwordHash",
        newPasswordHash,
      );
    });
  });

  describe("comparePassword(candidatePassword)", () => {
    let password: string;

    beforeEach(() => {
      password = "some password";
    });

    it("should call `bcrypt.compareSync(passwordHash, candidatePassword)`", () => {
      bcrypt.compareSync = jest.fn();
      user.passwordHash = password;
      const wrongPassword: string = "wrong password";

      user.comparePassword(wrongPassword);

      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        wrongPassword,
        user.passwordHash,
      );
    });

    it("should return true if `bcrypt.compareSync(passwordHash, candidatePassword)` returns true", () => {
      bcrypt.compareSync = jest.fn().mockReturnValue(true);
      user.passwordHash = password;
      const wrongPassword: string = "wrong password";

      const result = user.comparePassword(wrongPassword);

      expect(result).toBeTruthy();
    });

    it("should return false if `bcrypt.compareSync(passwordHash, candidatePassword)` returns false", () => {
      bcrypt.compareSync = jest.fn().mockReturnValue(false);
      user.passwordHash = password;
      const wrongPassword: string = "wrong password";

      const result = user.comparePassword(wrongPassword);

      expect(result).toBeFalsy();
    });
  });
});
