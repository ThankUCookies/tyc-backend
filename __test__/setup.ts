import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Set up .env file path
const envPath = path.resolve(process.cwd(), ".env");
// Load it if it exists
if (fs.existsSync(envPath)) {
  dotenv.config({
    path: envPath,
  });
}
