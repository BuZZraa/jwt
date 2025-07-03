import RegistrationForm from "./pages/Register/RegistrationForm";
import { RouterProvider, createBrowserRouter } from "react-router";
import RootLayout from "./components/Root/RootLayout";
import ForgotPassword from "./pages/Login/ForgotPassword";
import VerifyCode from "./pages/Login/VerifyCode";
import ChangePassword from "./pages/Login/ChangePassword";
import VerififedRoute from "./components/utils/VerififedRoute";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Homepage from "./pages/Notes/Homepage";
import EditNote from "./pages/Notes/EditNote";
import Login from "./pages/Login/Login";

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
        {
          path: "editNote",
          element: (
            <ProtectedRoute>
              <EditNote />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
