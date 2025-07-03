import UserDetailsModel from "../model/UserDetailsModel.js";
import validator from "email-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginUser(req, res) {
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
    { expiresIn: "10m" }
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
}
