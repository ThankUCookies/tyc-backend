import { inject, injectable } from "inversify";
import "reflect-metadata";
import TYPES from "../../../ioc/types";

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
}
