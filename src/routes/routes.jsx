import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";
const Login = Loadable({ loader: () => import("../pages/login/Login") });
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const errorPage = Loadable({ loader: () => import("../pages/error/Error") });
const HotelList = Loadable({ loader: () => import("../pages/hotellist/HotelList") });
const HotelDetail = Loadable({ loader: () => import("../pages/roomLisst/HotelDetail") });
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
        path: "/hotel-list",
        element: HotelList,
      },
      {
        path: "/hotel-detail/:hotelId",
        element: HotelDetail,
      },
      ////////////// add for more no login
    ]
  },
  {
    path: "*",
    element: errorPage,
  }

]);
