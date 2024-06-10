import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import SecondLayout from "../layout/SecondLayout";
import AuthGuard from "./AuthGuard";
const LoginMember = Loadable({ loader: () => import("../pages/user/login/LoginMember/Login") });
const LoginAdmin = Loadable({ loader: () => import("../pages/user/login/LoginAdmin") });
const LoginPartner = Loadable({ loader: () => import("../pages/user/login/LoginPartner") });
const errorPage = Loadable({ loader: () => import("../pages/error/Error") });
const RoomDetailsPage = Loadable({ loader: () => import("../pages/user/roomDetailsPage") });
const HotelList = Loadable({ loader: () => import("../pages/user/hotellist/HotelList") });
const HotelDetail = Loadable({ loader: () => import("../pages/user/roomLisst/HotelDetail") });
const RegisterMember = Loadable({ loader: () => import("../pages/user/registerPage/Member") });
const RegisterPartner = Loadable({ loader: () => import("../pages/user/registerPage/Partner") });

const Profile = Loadable({ loader: () => import("../pages/user/profile/Components/Profile/Profile") });
const Change = Loadable({ loader: () => import("../pages/user/profile/Components/ChangePassword/Change") });
const HomePage = Loadable({ loader: () => import("../pages/user/HomePage/HomePage") });
const User = Loadable({ loader: () => import("../pages/user/profile/index") });
const Booking = Loadable({ loader: () => import("../pages/user/profile/Components/Booking/Booking") });
const Invoice = Loadable({ loader: () => import("../pages/user/profile/Components/Invoice/Invoice") });
const Review = Loadable({ loader: () => import("../pages/user/profile/Components/Review/Review") });
const PaymentPage = Loadable({ loader: () => import("../pages/user/paymentPage") });
const BookingAdmin = Loadable({ loader: () => import("../pages/admin/ViewBooking/ViewBooking") });
const ViewUser = Loadable({ loader: () => import("../pages/admin/ViewUser/ViewUser") });
const ViewPartner = Loadable({ loader: () => import("../pages/admin/ViewPartner") });
const Dashboard = Loadable({ loader: () => import("../pages/admin/Dashboard/Dashboard") });
const ViewAmenities = Loadable({ loader: () => import("../pages/admin/ViewAmenities/ViewAmenities") });
const ConfirmRental = Loadable({ loader: () => import("../pages/admin/ConfirmRetal/ConfirmRental") });
const ViewBooking = Loadable({ loader: () => import("../pages/partner/ViewBooking/ViewBooking") });
const ManageHotel = Loadable({ loader: () => import("../pages/partner/ManageHotel/ManageHotel") });
const CreateHotel = Loadable({ loader: () => import("../pages/partner/CreateHotel") });

const Admin = Loadable({
  loader: () => import("../pages/admin/Admin"),
});
const partner = Loadable({
  loader: () => import("../pages/partner/partner"),
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
            path: "/user",
            element: User,
            children: [

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
        ],

      },
      {
        index: true,
        element: HomePage,
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
        path: "/room-details/:roomId",
        element: RoomDetailsPage,
      },
      {
        path: "/register",
        children: [
          {
            path: "member",
            element: RegisterMember,
          },
          {
            path: "partner",
            element: RegisterPartner,
          },
        ],
      },
      {
        path: "/login",
        children: [
          {
            path: "member",
            element: LoginMember,
          },
          {
            path: "admin",
            element: LoginAdmin,
          },
          {
            path: "partner",
            element: LoginPartner,
          },
        ],
      },
      {
        path: "/payment",
        element: PaymentPage,
      },
      ////////////// add for more no login
    ]
  },
  {
    element: <SecondLayout />,
    children: [
      {
        path: "/",
        element: <AuthGuard />,
        children: [
          {
            path: "/admin",
            element: Admin,
            children: [
              {
                index: true,
                element: Dashboard,
              },
              {
                path: "booking",
                element: BookingAdmin,
              },

              {
                path: "user",
                element: ViewUser,
              },
              {
                path: "view-partner",
                element: ViewPartner,
              },
              {
                path: "view-amenities",
                element: ViewAmenities,
              },
              {
                path: "confirm-rental",
                element: ConfirmRental,
              },
            ],
          },
          {
            path: "/partner",
            element: partner,
            children: [
              {
                index: true,
                element: ViewBooking,
              },
              {
                path: "manage-hotel",
                element: ManageHotel,
              },
              {
                path: "create-hotel",
                element: CreateHotel,
              },
            ]
          }
        ],
      },
    ]
  },
  {
    path: "*",
    element: errorPage,
  }

]);
