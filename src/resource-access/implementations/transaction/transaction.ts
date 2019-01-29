import { injectable } from "inversify";
import { ITransactionResourceAccess } from "../../contracts/transaction";

import { Transaction } from "../../../models/transaction";
import { TransactionSku } from "../../../models/transaction-sku";
import { TransactionType } from "../../../models/transaction-type";

@injectable()
export class TransactionResourceAccess implements ITransactionResourceAccess {
  public async getTypes(): Promise<TransactionType[]> {
    return await TransactionType.findAll();
  }

  public async create(transaction: object): Promise<Transaction> {
    return await Transaction.create(transaction);
  }

  public async addSku(sku: object): Promise<TransactionSku> {
    return await TransactionSku.create(sku);
  }
}
