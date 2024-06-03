import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";
const Login = Loadable({ loader: () => import("../pages/login/Login") });
const errorPage = Loadable({ loader: () => import("../pages/error/Error") });
const RoomDetailsPage = Loadable({ loader: () => import("../pages/roomDetailsPage") });
const HotelList = Loadable({ loader: () => import("../pages/hotellist/HotelList") });
const HotelDetail = Loadable({ loader: () => import("../pages/roomLisst/HotelDetail") });
const RegisterPage = Loadable({ loader: () => import("../pages/registerPage") });
const Dashboard = Loadable({ loader: () => import("../pages/profile/Components/Dashboard/Dashboard") });
const Profile = Loadable({ loader: () => import("../pages/profile/Components/Profile/Profile") });
const Change = Loadable({ loader: () => import("../pages/profile/Components/ChangePassword/Change") });
const HomePage = Loadable({ loader: () => import("../pages/HomePage/HomePage") });
const User = Loadable({ loader: () => import("../pages/profile/index") });
const Booking = Loadable({ loader: () => import("../pages/profile/Components/Booking/Booking") });
const Invoice = Loadable({ loader: () => import("../pages/profile/Components/Invoice/Invoice") });
const Review = Loadable({ loader: () => import("../pages/profile/Components/Review/Review") });


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
        path: "/user",
        element: User,
        children: [
          {
            path: "dashboard",
            element: Dashboard,
          },
          {
            path: "profile",
            element: Profile,
          },
          {
            path: "booking",
            element: Booking,
          },
          {
            path: "invoice",
            element: Invoice,
          },
          {
            path: "review",
            element: Review,
          },
          {
            path: "change-password",
            element: Change,
          },
        ]
      },

      {
        path: "/view-hotels",
        element: HotelList,
      },
      {
        path: "/hotel-detail/:hotelId",
        element: HotelDetail,
      },
      {
        path: "/room-details/:1",
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
      ////////////// add for more no login
    ]
  },
  {
    path: "*",
    element: errorPage,
  }

]);
