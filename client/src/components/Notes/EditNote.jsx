import Input from "../Form/Input";
import Button from "../Form/Button";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function EditNote() {
  const currentNote = useSelector((state) => state.note.note);
  const email = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [note, setNote] = useState(currentNote);

  async function handleEditNote(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    formData.email = email;
    formData.noteId = note._id;
    const successData = await axios.patch(
      "http://localhost:3000/editNote",
      formData,
      {
        withCredentials: true,
      }
    );

    if (successData.data.success) {
      navigate("/homepage");
    }
  }

  function handleChange(event) {
    setNote((prevNote) => ({
      ...prevNote,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="max-w-lg mx-auto border-1 border-gray-200 my-16 rounded-md p-4 space-y-8 shadow-md bg-gray-50">
      <h2 className="text-4xl font-semibold text-green-800">Edit Note</h2>

      <form className="space-y-4" onSubmit={handleEditNote}>
        <Input
          type="text"
          label="Title"
          name="title"
          value={note.title}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <label>Description</label>

          <textarea
            className="resize-none py-1 border-1 pl-1 border-gray-400 rounded-sm"
            name="description"
            value={note.description}
            onChange={handleChange}
          />
        </div>
        <Button>Edit Note</Button>
      </form>
    </div>
  );
}
