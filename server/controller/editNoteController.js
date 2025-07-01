import UserDetailsModel from "../model/UserDetailsModel.js";
import NotesModel from "../model/NotesModel.js";

export async function editNote(req, res) {
  const { title, description, email, noteId } = req.body;

  if (!title || !description) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  if (!email) {
    return res
      .status(401)
      .json({ success: false, message: "User email must be provided!" });
  }

  if (!noteId) {
    return res
      .status(401)
      .json({ success: false, message: "Note id must be provided!" });
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

  await NotesModel.updateOne(
    { userId: user._id, _id: noteId },
    { title, description }
  );

  res.status(201).json({ success: true, message: "Note added successfully!" });
}
