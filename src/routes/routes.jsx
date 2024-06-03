import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";
import profile from "../pages/profile/profile";
const Login = Loadable({ loader: () => import("../pages/login/Login") });
const errorPage = Loadable({ loader: () => import("../pages/error/Error") });
const RoomDetailsPage = Loadable({ loader: () => import("../pages/roomDetailsPage") });
const HotelList = Loadable({ loader: () => import("../pages/hotellist/HotelList") });
const HotelDetail = Loadable({ loader: () => import("../pages/roomLisst/HotelDetail") });
const RegisterPage = Loadable({ loader: () => import("../pages/registerPage") });
const Profile = Loadable({ loader: () => import("../pages/profile/profile") });
const Profile1 = Loadable({ loader: () => import("../components/Profile/Profile") });
const Change = Loadable({ loader: () => import("../components/ChangePassword/Change") });
const HomePage = Loadable({ loader: () => import("../pages/HomePage/HomePage") });
const PaymentPage = Loadable({ loader: () => import("../pages/paymentPage") });

const Dashboard = Loadable({
  loader: () => import("../pages/HomePage/HomePage"),
});
const Admin = Loadable({
  loader: () => import("../pages/admin/Admin"),
});
export const router = createBrowserRouter([

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
                element: HomePage,
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
        path: "/dashboard",
        element: Profile,
        children: [
          // {
          //   path: "/",
          //   element: Dashboard,
          // },
          {
            path: "profile",
            element: Profile1,
          },
          {
            path: "change-password",
            element: Change,
          },
        ]
      },

      {
        path: "/hotel-list",
        element: HotelList,
      },
      {
        path: "/hotel-detail/:hotelId",
        element: HotelDetail,
      },
      {
        path: "/room-details/:roomId",
        element: RoomDetailsPage,
      },
      {
        path: "/register",
        element: RegisterPage,
      },
      {
        path: "/login",
        element: Login,
      },
      {
        path: "/payment",
        element: PaymentPage,
      },
      ////////////// add for more no login
    ]
  },
  {
    path: "*",
    element: errorPage,
  }

]);
