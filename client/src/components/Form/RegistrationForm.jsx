import Input from "./Input";
import axios from "axios";
import Button from "./Button";

export default function RegistrationForm() {
  async function handleRegister(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const data = await axios.post("http://localhost:3000/register", formData);
    console.log(data);
  }

  return (
    <div className="max-w-lg mx-auto border-1 border-gray-200 my-16 rounded-md p-4 space-y-8 shadow-md bg-gray-50">
      <h1 className="text-4xl font-semibold text-green-800">
        Registration Form
      </h1>
      <form className="space-y-6" onSubmit={handleRegister}>
        <div className="flex gap-4">
          <Input type="text" label="Firstname" name="firstName" />
          <Input type="text" label="Lastname" name="lastName" />
        </div>
        <div className="flex gap-4">
          <Input type="date" label="Date of Birth" name="dateOfBirth" />
          <Input type="email" label="Email" name="email" />
        </div>
        <div className="flex gap-4">
          <Input type="number" label="Phone Number" name="phoneNumber" />
          <div className="w-full flex flex-col">
            <label>Gender</label>
            <select
              className="py-1 border-1 border-gray-400 rounded-sm"
              name="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <Input type="password" label="Password" name="password" />
        <Input
          type="password"
          label="Reenter Password"
          name="reenterPassword"
        />

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
