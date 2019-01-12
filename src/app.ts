import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";

// Routes
import { PassportJwtStrategy } from "./auth-strategies/passport-jwt";
import serviceLocator from "./ioc/service-locator";
import TYPES from "./ioc/types";
import IDatabase from "./resource-access/contracts/db";
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

// Setup authenitcation strategies
const JwtAuthStrategy = PassportJwtStrategy.authenticate("jwt", {
  session: false,
});

// Setup middlewares
app.use(express.json());

// Setup routes
app.use("/auth", userRoute);
app.use("/profile", JwtAuthStrategy, (req, res) => {
  res.send("profile");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
