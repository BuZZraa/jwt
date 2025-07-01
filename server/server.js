import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserDetailsModel from "./model/UserDetailsModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import validator from "email-validator";
import crypto from "crypto";
import VerificationCodeModel from "./model/VerificationCodeModel.js";
import sendMail from "./config/nodemailer.js";
import axios from "axios";

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
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

function authenticateToken(req, res, next) {
  const accessToken = req.cookies.access;
  if (accessToken == null)
    return res.status(401).json({
      message: "Expired",
    });

  jwt.verify(accessToken, process.env.ACCESS_SECRET, (err) => {
    console.log(err);
    if (err)
      return res.status(406).json({
        message: "Expired",
      });
    next();
  });
}

app.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    gender,
    password,
    reenterPassword,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !gender ||
    !password ||
    !reenterPassword
  ) {
    return res.status(400).json({ message: "All field are required!" });
  }

  if (password !== reenterPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Make sure the passwords match!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const newUser = new UserDetailsModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth,
    gender: gender,
    password: hashedPassword,
  });
  console.log(newUser);

  await newUser.save();

  return res
    .status(201)
    .json({ success: true, message: "User registered successfully!" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All field are required!" });
  }

  if (!validator.validate(email))
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid email!" });

  const user = await UserDetailsModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Please enter a registered email address!",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return res
      .status(400)
      .json({ success: false, message: "Enter a valid password!" });

  const accessToken = jwt.sign(
    {
      email: email,
    },
    process.env.ACCESS_SECRET,
    { expiresIn: "2s" }
  );

  const refreshToken = jwt.sign(
    {
      email: email,
    },
    process.env.REFRESH_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
  });
  res.cookie("access", accessToken, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000,
    secure: true,
  });
  return res
    .status(201)
    .json({ success: true, message: "Logged in successfully!" });
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refresh;
  if (refreshToken) {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(406).json({ message: "Unauthorized" });
      } else {
        const accessToken = jwt.sign({}, process.env.ACCESS_SECRET, {
          expiresIn: "10m",
        });
        res.cookie("access", accessToken, {
          httpOnly: true,
          maxAge: 10 * 60 * 1000,
          secure: true,
        });
        return res.status(201).json({ message: "Success" });
      }
    });
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
});

app.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({
      success: false,
      message: "Please enter email to reset your password!",
    });

  if (!validator.validate(email))
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid email!" });

  const isValidEmail = await UserDetailsModel.findOne({ email });
  if (!isValidEmail) {
    return res.status(401).json({
      success: false,
      message: "Please enter a registered email address!",
    });
  }

  const randomNum = crypto.randomInt(100000, 999999);

  const sendVerificationCode = await sendMail(randomNum, email);
  if (!sendVerificationCode) return;

  const prevCodeExists = await VerificationCodeModel.findOne({ email });
  if (prevCodeExists) {
    await VerificationCodeModel.updateOne(
      { email },
      { verificationCode: randomNum }
    );
  } else {
    const newVerificationCode = new VerificationCodeModel({
      email,
      verificationCode: randomNum,
    });
    await newVerificationCode.save();
  }

  res.status(201).json({ success: true, message: "Success" });
});

app.post("/verifyCode", async (req, res) => {
  const { email, verificationCode } = req.body;

  if (!verificationCode) {
    res
      .status(400)
      .json({ success: false, message: "Please enter a verification code!" });
  }

  const isValidVerificationCode = await VerificationCodeModel.findOne({
    email,
    verificationCode,
  });

  if (!isValidVerificationCode) {
    res.status(401).json({
      success: false,
      message: "Please enter a valid verification code!",
    });
  }

  res
    .status(201)
    .json({ success: true, message: "Code verified successfully!" });
});

app.post("/changePassword", async (req, res) => {
  const { email, password, reenterPassword } = req.body;

  if (!password || !reenterPassword) {
    res
      .status(400)
      .json({ success: false, message: "All fields should be entered!" });
  }

  if (password !== reenterPassword) {
    res.status(400).json({ success: false, message: "Passwords don't match!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserDetailsModel.updateOne({ email }, { password: hashedPassword });

  res.json({ success: true, message: "Password changed successfully!" });
});

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});

app.get("/homepage", authenticateToken, async (req, res) => {
  const fetchedData = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?userId=1"
  );

  if (!fetchedData) {
    res.status(500).json({
      success: false,
      message: "Server issue! Please try again later!",
    });
  }

  res.status(201).json({
    success: true,
    message: "Data sent successfully!",
    data: fetchedData.data,
  });
});
