import UserDetailsModel from "../model/UserDetailsModel.js";
import NotesModel from "../model/NotesModel.js";

export async function homepage(req, res) {
  const email = req.body.email;
  const user = await UserDetailsModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const notes = await NotesModel.find({
    userId: user._id,
  });

  if (!notes) {
    return res.status(400).json({
      success: false,
      message: "No notes found for this user!",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Data sent successfully!",
    data: notes,
  });
}