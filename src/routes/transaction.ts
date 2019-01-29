import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator/check";
import { ITransactionBusinessAccess } from "../business-access/contracts/transaction";
import serviceLocator from "../ioc/service-locator";
import TYPES from "../ioc/types";

const transactionRoute = express.Router();
const transactionBusinessAccess: ITransactionBusinessAccess = serviceLocator.get<
  ITransactionBusinessAccess
>(TYPES.TransactionBusinessAcess);

transactionRoute.get("/types", async (req: Request, res: Response) => {
  try {
    const types = await transactionBusinessAccess.getTypes();

    res.json({
      error: false,
      types,
    });
  } catch (error) {
    res.json({ error });
  }
});

transactionRoute.get("/events", async (req: Request, res: Response) => {
  try {
    const events = await transactionBusinessAccess.getEvents();

    res.json({
      error: false,
      events,
    });
  } catch (error) {
    res.json({ error });
  }
});

transactionRoute.post(
  "/create",
  [body("typeId").exists(), body("eventId").exists()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    // set date to IST
    const today = new Date();
    today.setHours(today.getUTCHours() + 5);
    today.setMinutes(today.getUTCMinutes() + 30);

    if (errors.isEmpty()) {
      try {
        // TODO: use UTC timestamp
        const transaction = await transactionBusinessAccess.create({
          dateTime: today,
          eventId: req.body.eventId,
          typeId: req.body.typeId,
          userId: req.user.id,
        });

        res.json({
          error: false,
          id: transaction.id,
        });
      } catch (error) {
        res.json({ error });
      }
    } else {
      res.json({ error: errors.array() });
    }
  },
);

transactionRoute.post(
  "/:id/add-sku",
  [body("skuCode").exists()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        // TODO: use UTC timestamp
        const transaction = await transactionBusinessAccess.addSku({
          skuCode: req.body.skuCode,
          transactionId: req.params.id,
        });

        res.json({
          error: false,
          id: transaction.id,
        });
      } catch (error) {
        res.json({ error });
      }
    } else {
      res.json({
        error: errors.array(),
      });
    }
  },
);

export default transactionRoute;
