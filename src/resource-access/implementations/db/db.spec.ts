import { Sequelize } from "sequelize-typescript";
import IDatabase from "../../contracts/db";
import { Database } from "./db";

jest.mock("sequelize-typescript", () => ({
  Sequelize: jest.fn().mockImplementation(() => ({
    addModels: jest.fn(),
  })),
}));
// Mock all the models that are added to the db
jest.mock("../../../models/user", () => ({
  User: {},
}));
jest.mock("../../../models/transaction-type", () => ({
  TransactionType: {},
}));
jest.mock("../../../models/transaction", () => ({
  Transaction: {},
}));
jest.mock("../../../models/transaction-sku", () => ({
  TransactionSku: {},
}));
jest.mock("../../../models/event", () => ({
  Event: {},
}));

describe("Database", () => {
  describe("connect()", () => {
    let db: IDatabase;
    let host: string;
    let username: string;
    let password: string;
    let database: string;

    beforeEach(() => {
      host = "db host";
      db = new Database();
      host = "host";
      username = "username";
      password = "password";
      database = "database";

      Database.connecion = undefined;
      jest.clearAllMocks();
    });

    it("should set connection to new sequalize object with required parameters when connection is null", () => {
      process.env.DB_HOST = host;
      process.env.DB_USERNAME = username;
      process.env.DB_PWD = password;
      process.env.DB_NAME = database;

      const connection = db.connect();

      expect(Sequelize).toHaveBeenCalledWith({
        database,
        dialect: "mysql",
        host,
        password,
        username,
      });
      expect(Database.connecion).toBe(connection);
    });

    it("should set connection to new sequalize object with default parameters when connection is null", () => {
      process.env.DB_HOST = undefined;
      process.env.DB_USERNAME = undefined;
      process.env.DB_PWD = undefined;
      process.env.DB_NAME = undefined;

      const connection = db.connect();

      expect(Sequelize).toHaveBeenCalledWith({
        database: "tyc-data",
        dialect: "mysql",
        host: "localhost",
        password: "",
        username: "root",
      });
      expect(Database.connecion).toBe(connection);
    });

    it("should call addModles when connection is null", () => {
      db.connect();

      if (Database.connecion !== undefined) {
        expect(Database.connecion.addModels).toHaveBeenCalled();
      }
    });

    it("should return old connection when connection is null", () => {
      const connection = (Database.connecion = new Sequelize({
        database,
        dialect: "mysql",
        host,
        password,
        username,
      }));

      db.connect();

      expect(Database.connecion).toBe(connection);
    });
  });
});
