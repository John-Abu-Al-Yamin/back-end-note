import express from "express";
import dotenv from "dotenv";
import notes from "./routes/notes.js";
import users from "./routes/users.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
dotenv.config({
  path: "./config/config.env",
});

const app = express();
app.use(express.json());
app.use(cors());

// Router
app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("server is running port 4000!");
});
