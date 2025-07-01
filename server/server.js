import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import { registerUser } from "./controller/registerController.js";
import { loginUser } from "./controller/loginController.js";
import { generateAccessToken } from "./controller/refreshController.js";
import { forgotPassword } from "./controller/forgotPasswordController.js";
import { verifyCode } from "./controller/verifyCodeController.js";
import { changePassword } from "./controller/changePasswordController.js";
import { homepage } from "./controller/homepageController.js";
import { addNote } from "./controller/addNoteController.js";
import { editNote } from "./controller/editNoteController.js";
import { deleteNote } from "./controller/deleteNoteController.js";
import authenticateToken from "./utils/authenticateToken.js";

const app = express();

mongoose.connect("mongodb://localhost:27017/UserDetailsDB").then(() => {
  console.log("Connected to database!");
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", registerUser);

app.post("/login", loginUser);

app.post("/refresh", generateAccessToken);

app.post("/forgotPassword", forgotPassword);

app.post("/verifyCode", verifyCode);

app.post("/changePassword", changePassword);

app.post("/homepage", authenticateToken, homepage);

app.post("/addNote", authenticateToken, addNote);

app.patch("/editNote", authenticateToken, editNote);

app.delete("/deleteNote", authenticateToken, deleteNote);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});