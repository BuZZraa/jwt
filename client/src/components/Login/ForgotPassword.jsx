import Input from "../Form/Input";
import Button from "../Form/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  async function handleForgotPassword(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const successSubmit = await axios.post(
      "http://localhost:3000/forgotPassword",
      formData
    );

    if (successSubmit.data.success) {
      navigate("/verifyCode");
      localStorage.setItem("email", formData.email);
    }
  }

  return (
    <div className="max-w-lg mx-auto border-1 border-gray-200 my-16 rounded-md p-4 space-y-8 shadow-md bg-gray-50">
      <div className="space-y-2">
        <h2 className="text-4xl">Forgot Password</h2>
        <p className="tracking-tight text-xs font-light">
          Please enter your email to reset your password.
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleForgotPassword}>
        <Input type="email" label="Email" name="email" />
        <Button>Reset Password</Button>
      </form>
    </div>
  );
}
