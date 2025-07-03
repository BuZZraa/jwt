import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import expiredRequest from "../../components/utils/expiredRequest";

export default function AddNote({ onAdd }) {
  const email = useSelector((state) => state.session.user);

  async function handleAddNote(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    formData.email = email;

    async function initialRequest() {
      await axios.post("http://localhost:3000/addNote", formData, {
        withCredentials: true,
      });
      onAdd();
    }

    expiredRequest(initialRequest);
  }

  return (
    <form className="space-y-4" onSubmit={handleAddNote}>
      <Input type="text" label="Title" name="title" />
      <div className="flex flex-col">
        <label>Description</label>

        <textarea
          className="resize-none py-1 border-1 pl-1 border-gray-400 rounded-sm"
          name="description"
        />
      </div>
      <Button>Add Note</Button>
    </form>
  );
}
