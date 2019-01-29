import { injectable } from "inversify";
import "reflect-metadata";
import { Sequelize } from "sequelize-typescript";
import { Transaction } from "../../../models/transaction";
import { TransactionType } from "../../../models/transaction-type";
import { User } from "../../../models/user";

import { Event } from "../../../models/event";
import { TransactionSku } from "../../../models/transaction-sku";
import IDatabase from "../../contracts/db";

@injectable()
export class Database implements IDatabase {
  public static connecion: Sequelize | undefined;

  public connect(): Sequelize | null {
    if (Database.connecion === undefined) {
      let host: string | undefined = process.env.DB_HOST;
      let username: string | undefined = process.env.DB_USERNAME;
      let password: string | undefined = process.env.DB_PWD;
      let database: string | undefined = process.env.DB_NAME;

      // This if statement is due to the wierd value that JavaScript stores in process.env
      if (host === undefined || host === "undefined") {
        host = "localhost";
      }
      if (username === undefined || username === "undefined") {
        username = "root";
      }
      if (password === undefined || password === "undefined") {
        password = "";
      }
      if (database === undefined || database === "undefined") {
        database = "tyc-data";
      }

      Database.connecion = new Sequelize({
        database,
        dialect: "mysql",
        host,
        password,
        username,
      });

      Database.connecion.addModels([
        User,
        TransactionType,
        Transaction,
        TransactionSku,
        Event,
      ]);
    }

    return Database.connecion;
  }
}
