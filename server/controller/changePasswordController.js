import bcrypt from "bcrypt";
import UserDetailsModel from "../model/UserDetailsModel.js";

export async function changePassword(req, res) {
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
}
