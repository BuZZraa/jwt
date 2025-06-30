import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserDetailsModel = mongoose.model("userdetails", UserDetailsSchema);
export default UserDetailsModel;