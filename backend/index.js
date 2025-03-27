import express from "express";
import dotenv from "dotenv/config";
import connectToDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import todoRoute from "./routes/todo.route.js";
import { checkForAuth } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8001;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use("/api/user", userRoute);

app.use("/api/todo", checkForAuth, todoRoute);
app.listen(PORT, () => {
  connectToDB();
  console.log("Server is running at port number", PORT);
});
