import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [data, setData] = useState([]);

  async function getData() {
    const getData = await axios.get("http://localhost:3000/homepage", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return getData;
  }

  useEffect(() => {
    getData()
      .then((data) => {
        setData(data.data.data);
      })
      .catch((error) => {
        if (error.response.data.message === "Expired") {
          axios.post("http://localhost:3000/refresh", undefined, {
            withCredentials: true,
          });
        }
      });
  }, []);

  return (
    <div className="max-w-lg mx-auto border-1 border-gray-200 my-16 rounded-md p-4 space-y-8 shadow-md bg-gray-50">
      <h2 className="text-4xl font-semibold text-green-800">Todo</h2>
      <ol className="text-sm space-y-1">
        {data &&
          data.map((data) => {
            return <li key={data.id}>{`${data.id}. ${data.title}`}</li>;
          })}
      </ol>
    </div>
  );
}
