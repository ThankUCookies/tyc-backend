import { injectable } from "inversify";

import { TransactionType } from "../../../models/transaction-type";
import { ITransactionResourceAccess } from "../../contracts/transaction";

@injectable()
export class TransactionResourceAccess implements ITransactionResourceAccess {
  public async getTypes(): Promise<TransactionType[]> {
    return await TransactionType.findAll();
  }
}
