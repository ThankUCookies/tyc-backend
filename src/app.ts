import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";

import { PassportJwtStrategy } from "./auth-strategies/password-jwt/passport-jwt";
import serviceLocator from "./ioc/service-locator";
import TYPES from "./ioc/types";
import IDatabase from "./resource-access/contracts/db";

// Routes
import transactionRoute from "./routes/transaction";
import userRoute from "./routes/user";

// Set up .env file path
const envPath = path.resolve(process.cwd(), ".env");
// Load it if it exists
if (fs.existsSync(envPath)) {
  dotenv.config({
    path: envPath,
  });
}

// TODO: handle db connection errors
// Setup the db connection
const db = serviceLocator.get<IDatabase>(TYPES.Database);
db.connect();

const app = express();

// Setup CORS
app.use(
  cors({
    allowedHeaders: "*",
    origin: "*",
  }),
);

// Setup authenitcation strategies
const JwtAuthStrategy = PassportJwtStrategy.authenticate("jwt", {
  session: false,
});

// Setup middlewares
app.use(express.json());

// Setup routes
app.use("/auth", userRoute);
app.use("/transactions", JwtAuthStrategy, transactionRoute);

// Start the server
app.listen(process.env.PORT || "3000", () => {
  console.log(`server running at port ${process.env.PORT}`);
});
