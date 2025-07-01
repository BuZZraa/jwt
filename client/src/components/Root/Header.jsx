import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { sessionActions } from "../../state/sessionSlice";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
  const dispatch = useDispatch();

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
        {!isLoggedIn && (
          <>
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
          </>
        )}
        {isLoggedIn && (
          <li>
            <button
              className="hover:underline"
              onClick={() => {
                dispatch(sessionActions.logout());
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}
