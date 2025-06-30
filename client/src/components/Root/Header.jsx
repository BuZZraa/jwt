import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="py-8 bg-green-400">
      <ul className="flex justify-center space-x-16 text-white">
        <li>Home</li>
        <li>About us</li>
        <li>Register</li>
        <li>Login</li>
      </ul>
    </header>
  );
}
