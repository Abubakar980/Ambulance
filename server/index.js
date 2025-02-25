import express from "express";
import mongoose from "mongoose";
// import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Enable CORS with specific settings
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    methods: "GET,POST,PUT,DELETE,PATCH", // Allowed HTTP methods
    credentials: true, // If using cookies/authentication
  })
);

// app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ DB Connected Successfully !!!");
    app.listen(PORT, () => {
      console.log(`Server is listening at ${PORT} Port`);
    });
  })
  .catch((error) => {
    console.error("❌ DB Connection Failed!", error);
    process.exit(1); // Exit on failure
  });
app.use("/api", route);
