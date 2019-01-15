import { Sequelize } from "sequelize-typescript";
import serviceLocator from "../../ioc/service-locator";
import TYPES from "../../ioc/types";
import IDatabase from "../../resource-access/contracts/db";

describe("Database", () => {
  let db: IDatabase;

  beforeEach(() => {
    db = serviceLocator.get<IDatabase>(TYPES.Database);
  });

  describe("connect()", () => {
    it("should connect to the database", (done) => {
      expect.assertions(1);
      const sequelize: Sequelize = db.connect();

      sequelize.authenticate().then(() => {
        expect(1).toBe(1);
        done();
      });
    });
  });
});
