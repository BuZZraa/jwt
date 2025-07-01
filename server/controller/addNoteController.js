import UserDetailsModel from "../model/UserDetailsModel.js";
import NotesModel from "../model/NotesModel.js";

export async function addNote(req, res) {
  const { title, description, email } = req.body;

  if (!title || !description) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  const user = await UserDetailsModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const newNote = new NotesModel({
    title,
    description,
    userId: user._id,
  });
  await newNote.save();
  res.status(201).json({ success: true, message: "Note added successfully!" });
}