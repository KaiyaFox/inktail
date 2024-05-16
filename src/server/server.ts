// server.ts

const next = require("next");
import express, { Request, Response } from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const expressApp = express();
// set port for server
const port = 3001;

// Define Express.js routes
expressApp.get("/api/users", (req: Request, res: Response) => {
  // Handle custom logic with Express.js
  res.json({ message: "Custom API response" });
});

expressApp.get("/api/image-hash", (req: Request, res: Response) => {
  // Handle custom logic with Express.js
  res.json({ message: "HASHED IMAGE" });
});

app.prepare().then(() => {
  // Use Express.js as middleware to handle custom routes
  expressApp.use((req: Request, res: Response) => {
    handle(req, res);
  });

  // Start server
  expressApp.listen(port, () => {
    console.log("Server is running on port", port);
  });
});
