import { User } from "../../../models/user";
import { IUserResourceAccess } from "../../contracts/user";
import { UserResourceAccess } from "./user";

describe("UserResourceAccess", () => {
  let userResourceAccess: IUserResourceAccess;

  beforeEach(() => {
    userResourceAccess = new UserResourceAccess();
  });

  describe("getUser(userName)", () => {
    let userName: string;
    let user: object;

    beforeEach(() => {
      userName = "someone";
      user = { userName };
    });

    it("should call getUser({ where: { userName } }) on User model", async () => {
      User.findOne = jest.fn();

      await userResourceAccess.getUser(userName);

      expect(User.findOne).toHaveBeenCalledWith({ where: { userName } });
    });

    it("should return result from getUser({ where: { userName } }) on User model", async () => {
      User.findOne = jest.fn().mockResolvedValue(user);

      const returnedUser = await userResourceAccess.getUser(userName);

      expect(returnedUser).toEqual(user);
    });
  });
});
