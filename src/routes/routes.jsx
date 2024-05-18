import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";
const Login = Loadable({ loader: () => import("../pages/login/Login") });
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const errorPage = Loadable({ loader: () => import("../pages/error/Error") });
const RoomList = Loadable({ loader: () => import("../pages/roomLisst/RoomList") });
const Test = Loadable({ loader: () => import("../pages/roomLisst/Test") });
const Dashboard = Loadable({
  loader: () => import("../pages/dashboard/Dashboard"),
});
const Admin = Loadable({
  loader: () => import("../pages/admin/Admin"),
});
export const router = createBrowserRouter([
  {
    path: "/login",
    element: Login,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <AuthGuard />,
        children: [
          {
            children: [
              {
                index: true,
                element: Dashboard,
              },
              {
                path: "home",
                element: Home,
              },
              {
                path: "admin",
                element: Admin,
              },

            ],
          },
        ],
      },
      {
        path: "/room-list",
        element: RoomList,
      },
 ////////////// add for more no login
    ]
  },

  {
    path: "*",
    element: errorPage,
  },
]);
