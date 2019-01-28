import { Transaction } from "../../models/transaction";
import { TransactionSku } from "../../models/transaction-sku";
import { TransactionType } from "../../models/transaction-type";

export interface ITransactionBusinessAccess {
  getTypes(): Promise<TransactionType[]>;
  create(transaction: object): Promise<Transaction>;
  addSku(sku: object): Promise<TransactionSku>;
}
