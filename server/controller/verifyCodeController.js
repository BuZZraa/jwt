import VerificationCodeModel from "../model/VerificationCodeModel.js";

export async function verifyCode(req, res) {
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
}
