import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="py-8 bg-green-400">
      <ul className="flex justify-center space-x-16 text-white">
        <li>
          <NavLink to="/homepage" className="hover:underline">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="hover:underline">About us</NavLink>
        </li>
        <li>
          <NavLink to="/" className="hover:underline">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="hover:underline">
            Login
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
