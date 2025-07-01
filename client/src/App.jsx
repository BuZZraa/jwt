import RegistrationForm from "./components/Form/RegistrationForm";
import { RouterProvider, createBrowserRouter } from "react-router";
import RootLayout from "./components/Root/RootLayout";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import VerifyCode from "./components/Login/VerifyCode";
import ChangePassword from "./components/Login/ChangePassword";
import VerififedRoute from "./components/utils/VerififedRoute";
import Homepage from "./components/Root/Homepage";
import ProtectedRoute from "./components/utils/ProtectedRoute";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <RegistrationForm />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgotPassword",
          element: <ForgotPassword />,
        },
        {
          path: "verifyCode",
          element: (
            <VerififedRoute>
              <VerifyCode />,
            </VerififedRoute>
          ),
        },
        {
          path: "changePassword",
          element: (
            <VerififedRoute>
              <ChangePassword />
            </VerififedRoute>
          ),
        },
        {
          path: "homepage",
          element: (
            <ProtectedRoute>
              <Homepage />,
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
