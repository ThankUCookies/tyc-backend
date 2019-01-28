import express, { Request, Response } from "express";
import { ITransactionBusinessAccess } from "../business-access/contracts/transaction";
import serviceLocator from "../ioc/service-locator";
import TYPES from "../ioc/types";

const transactionRoute = express.Router();
const transactionnBusinessAccess: ITransactionBusinessAccess = serviceLocator.get<
  ITransactionBusinessAccess
>(TYPES.TransactionBusinessAcess);

transactionRoute.get("/types", async (req: Request, res: Response) => {
  try {
    const types = await transactionnBusinessAccess.getTypes();

    res.json({
      error: false,
      types,
    });
  } catch (error) {
    res.json({ error });
  }
});

export default transactionRoute;
