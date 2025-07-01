import bcrypt from "bcrypt";
import UserDetailsModel from "../model/UserDetailsModel.js";

export async function registerUser(req, res) {
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
}