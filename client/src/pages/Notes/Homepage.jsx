import axios from "axios";
import { useEffect, useState } from "react";
import AddNote from "./AddNote";
import { noteActions } from "../../state/noteSlice";
import { useSelector } from "react-redux";
import expiredRequest from "../../components/utils/expiredRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Homepage() {
  const [data, setData] = useState([]);
  const email = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getData() {
    async function initialRequest() {
      const res = await axios.post(
        "http://localhost:3000/homepage",
        { email },
        { withCredentials: true }
      );

      return res;
    }
    setData((await initialRequest()).data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  function handleEditNote(data) {
    dispatch(noteActions.setNote(data));
    navigate("/editNote");
  }

  async function handleDelete(noteId) {
    async function initialRequest() {
      await axios.delete("http://localhost:3000/deleteNote", {
        data: { email, noteId },
        withCredentials: true,
      });
      getData();
    }

    expiredRequest(initialRequest);
  }

  return (
    <>
      <div className="max-w-lg mx-auto border-1 border-gray-200 my-16 rounded-md p-4 space-y-8 shadow-md bg-gray-50">
        <h2 className="text-4xl font-semibold text-green-800">Add Note</h2>
        <AddNote onAdd={getData} />
      </div>
      <div className="max-w-lg mx-auto border-1 border-gray-200 my-16 rounded-md p-4 space-y-8 shadow-md bg-gray-50">
        <h2 className="text-3xl text-green-800">Todo</h2>
        <ol className="text-sm space-y-4">
          {data &&
            data.map((data) => {
              return (
                <li key={data._id}>
                  <h3 className="font-semibold text-2xl">{data.title}</h3>
                  <p className="font-light">{data.description}</p>
                  <div className="flex gap-4">
                    <button
                      className="text-green-800 hover:cursor-pointer"
                      onClick={() => handleEditNote(data)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-800 hover:cursor-pointer"
                      onClick={() => handleDelete(data._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    </>
  );
}
