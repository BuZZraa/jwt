import Input from "../Form/Input";
import Button from "../Form/Button";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ChangePassword() {
  const navigate = useNavigate();
  async function handleChangePassword(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const passwordChanged =await axios.post(
      "http://localhost:3000/changePassword",
      formData
    );

    console.log(passwordChanged)
    if (passwordChanged.data.success) {
      localStorage.removeItem("email");
      navigate("/login");
    }
  }

  return (
    <div className="max-w-lg mx-auto border-1 border-gray-200 my-16 rounded-md p-4 space-y-8 shadow-md bg-gray-50">
      <h1 className="text-4xl font-semibold text-green-800">Change Password</h1>
      <form className="flex flex-col space-y-6" onSubmit={handleChangePassword}>
        <input
          type="hidden"
          name="email"
          value={localStorage.getItem("email")}
        />
        <Input type="password" label="Password" name="password" />

        <Input
          type="password"
          label="Reenter Password"
          name="reenterPassword"
        />

        <Button type="submit">Change Password</Button>
      </form>
    </div>
  );
}