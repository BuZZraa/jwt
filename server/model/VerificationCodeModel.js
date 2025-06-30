import mongoose from "mongoose";

const VerificationCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  verificationCode: {
    type: String,
    required: true,
  },
});

const VerificationCodeModel = mongoose.model(
  "verificationCodes",
  VerificationCodeSchema
);
export default VerificationCodeModel;
