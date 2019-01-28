import { inject, injectable } from "inversify";
import "reflect-metadata";
import TYPES from "../../../ioc/types";

import { Transaction } from "../../../models/transaction";
import { TransactionSku } from "../../../models/transaction-sku";
import { TransactionType } from "../../../models/transaction-type";
import { ITransactionResourceAccess } from "../../../resource-access/contracts/transaction";
import { ITransactionBusinessAccess } from "../../contracts/transaction";

@injectable()
export class TransactionBusinessAccess implements ITransactionBusinessAccess {
  private transactionResourceAccess: ITransactionResourceAccess;

  constructor(
    @inject(TYPES.TransactionResourceAccess)
    transactionResourceAccess: ITransactionResourceAccess,
  ) {
    this.transactionResourceAccess = transactionResourceAccess;
  }

  public async getTypes(): Promise<TransactionType[]> {
    return await this.transactionResourceAccess.getTypes();
  }

  public async create(transaction: object): Promise<Transaction> {
    return await this.transactionResourceAccess.create(transaction);
  }

  public async addSku(sku: object): Promise<TransactionSku> {
    return await this.transactionResourceAccess.addSku(sku);
  }
}
