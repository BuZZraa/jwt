import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
