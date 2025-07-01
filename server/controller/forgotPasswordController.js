import UserDetailsModel from "../model/UserDetailsModel.js";
import VerificationCodeModel from "../model/VerificationCodeModel.js";
import validator from "email-validator";
import crypto from "crypto";
import sendMail from "../config/nodemailer.js";

export async function forgotPassword(req, res) {
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
}
