import axios from "axios";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import { useNavigate } from "react-router";

export default function VerifyCode() {
  const navigate = useNavigate();

  async function handleVerifyCode(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    const verifiedCode = await axios.post(
      "http://localhost:3000/verifyCode",
      formData
    );

    if (verifiedCode.data.success) {
      navigate("/changePassword");
    }

  }

  return (
    <div className="max-w-lg mx-auto border-1 border-gray-200 my-16 rounded-md p-4 space-y-8 shadow-md bg-gray-50">
      <div className="space-y-2">
        <h2 className="text-4xl font-semibold">Verify Code</h2>
        <p className="tracking-tight text-xs font-light">
          Please enter the verification code sent to your mail.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleVerifyCode}>
        <input
          type="hidden"
          name="email"
          value={localStorage.getItem("email")}
        />
        <Input
          type="number"
          label="Verification Code"
          name="verificationCode"
        />
        <Button>Verify Code</Button>
      </form>
    </div>
  );
}
