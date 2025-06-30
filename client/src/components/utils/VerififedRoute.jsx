import { Navigate } from "react-router";

export default function VerififedRoute({ children }) {
  const email = localStorage.getItem("email");
  console.log(email);
  if (!email) {
    return <Navigate to="/forgotPassword" />;
  }

  return children;
}
