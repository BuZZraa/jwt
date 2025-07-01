import { NavLink, useNavigate } from "react-router";
import Input from "../Form/Input";
import axios from "axios";
import Button from "../Form/Button";
import { useDispatch } from "react-redux";
import { sessionActions } from "../../state/sessionSlice.js";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const successData = await axios.post(
      "http://localhost:3000/login",
      formData,
      {
        withCredentials: true,
      }
    );

    if (successData.data.success) {
      navigate("/homepage");
      dispatch(sessionActions.login());
    }
  }
  return (
    <div className="max-w-lg mx-auto border-1 border-gray-200 my-16 rounded-md p-4 space-y-8 shadow-md bg-gray-50">
      <h1 className="text-4xl font-semibold text-green-800">Login Form</h1>
      <form className="flex flex-col space-y-6" onSubmit={handleLogin}>
        <Input type="email" label="Email" name="email" />

        <Input type="password" label="Password" name="password" />

        <NavLink
          to="/forgotPassword"
          className="text-green-800 text-xs tracking-tight font-semibold hover:underline"
        >
          Forgot Password
        </NavLink>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
