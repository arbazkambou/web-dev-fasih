import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { Uploader } from "./data/uploader";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/cabins",
        element: <Cabins />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/upload",
        element: <Uploader />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
