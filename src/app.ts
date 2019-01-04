import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";

// Routes
import userRoute from "./routes/user";

// Set up .env file path
const envPath = path.resolve(process.cwd(), ".env");
// Load it if it exists
if (fs.existsSync(envPath)) {
  dotenv.config({
    path: envPath,
  });
}

const app = express();

// Setup routes
app.use("/auth", userRoute);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
