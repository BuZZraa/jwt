import UserDetailsModel from "../model/UserDetailsModel.js";
import NotesModel from "../model/NotesModel.js";

export async function deleteNote(req, res) {
  const { email, noteId } = req.body;

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
  await NotesModel.deleteOne({ userId: user._id, _id: noteId });

  return res
    .status(201)
    .json({ success: true, message: "Note deleted successfully!" });
}
