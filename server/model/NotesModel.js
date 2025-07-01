import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const NotesModel = mongoose.model("notes", NotesSchema);

export default NotesModel;
