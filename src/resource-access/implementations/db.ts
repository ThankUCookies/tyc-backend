import { injectable } from "inversify";
import "reflect-metadata";
import { Sequelize } from "sequelize-typescript";
import { User } from "../../models/user";
import IDatabase from "../contracts/db";

@injectable()
export class Database implements IDatabase {
  private static connecion: Sequelize;

  public connect(): Sequelize {
    if (Database.connecion === undefined) {
      const host: string = process.env.DB_HOST || "localhost";
      const username: string = process.env.DB_USERNAME || "root";
      const password: string = process.env.DB_PWD || "";
      const database: string = process.env.DB_NAME || "tyc-data";

      Database.connecion = new Sequelize({
        database,
        dialect: "mysql",
        host,
        password,
        username,
      });

      Database.connecion.addModels([User]);
    }

    return Database.connecion;
  }
}
