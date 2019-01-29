import { injectable } from "inversify";
import { Transaction } from "../../src/models/transaction";
import { TransactionSku } from "../../src/models/transaction-sku";
import { TransactionType } from "../../src/models/transaction-type";
import { ITransactionResourceAccess } from "../../src/resource-access/contracts/transaction";

@injectable()
export class TransactionResourceAccessMock
  implements ITransactionResourceAccess {
  public async getTypes(): Promise<TransactionType[]> {
    return Promise.resolve([new TransactionType()]);
  }

  public async create(transaction: object): Promise<Transaction> {
    return Promise.resolve(new Transaction());
  }

  public async addSku(sku: object): Promise<TransactionSku> {
    return Promise.resolve(new TransactionSku());
  }
}
