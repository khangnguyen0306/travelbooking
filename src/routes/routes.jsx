import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import SecondLayout from "../layout/SecondLayout";
import AuthGuard from "./AuthGuard";

const Login = Loadable({ loader: () => import("../pages/user/login/login") });
const errorPage = Loadable({ loader: () => import("../pages/error/Error") });
const RoomDetailsPage = Loadable({ loader: () => import("../pages/user/roomDetailsPage") });
const HotelList = Loadable({ loader: () => import("../pages/user/hotellist/HotelList") });
const HotelDetail = Loadable({ loader: () => import("../pages/user/roomLisst/HotelDetail") });
const Register = Loadable({ loader: () => import("../pages/user/register/Register") });

const Profile = Loadable({ loader: () => import("../pages/user/profile/Components/Profile/Profile") });
const Change = Loadable({ loader: () => import("../pages/user/profile/Components/ChangePassword/Change") });
const HomePage = Loadable({ loader: () => import("../pages/user/HomePage/HomePage") });
const User = Loadable({ loader: () => import("../pages/user/profile/index") });
const Booking = Loadable({ loader: () => import("../pages/user/profile/Components/Booking/Booking") });
const Invoice = Loadable({ loader: () => import("../pages/user/profile/Components/Invoice/Invoice") });
const Review = Loadable({ loader: () => import("../pages/user/profile/Components/Review/Review") });
const PaymentPage = Loadable({ loader: () => import("../pages/user/paymentPage") });

// admin page
const Dashboard = Loadable({ loader: () => import("../pages/admin/Dashboard") });
const AdminManageBookings = Loadable({ loader: () => import("../pages/admin/AdminManageBookings") });
const AdminManageUsers = Loadable({ loader: () => import("../pages/admin/AdminManageUsers") });
const AdminManagePartners = Loadable({ loader: () => import("../pages/admin/AdminManagePartners") });
const AdminManageHotels = Loadable({ loader: () => import("../pages/admin/AdminManageHotels") });
const AdminHotelDetails = Loadable({ loader: () => import("../pages/admin/AdminManageHotels/Components/AdminHotelDetails") });
const AdminManageConveniences = Loadable({ loader: () => import("../pages/admin/AdminManageConveniences") });

// partner page
const ViewBooking = Loadable({ loader: () => import("../pages/partner/ViewBooking/ViewBooking") });
const ManageHotel = Loadable({ loader: () => import("../pages/partner/ManageHotel/ManageHotel") });
const PartnerHotelDetails = Loadable({ loader: () => import("../pages/partner/ManageHotel/Components/PartnerHotelDetails") });
const CreateHotel = Loadable({ loader: () => import("../pages/partner/CreateHotel") });
const Edit = Loadable({ loader: () => import("../pages/partner/EditHotel/EditHotel") });
const Room = Loadable({ loader: () => import("../pages/partner/ManageRoom/ManageRoom") });
const CreateRoom = Loadable({ loader: () => import("../pages/partner/CreateRoom/CreateRoom") });

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
        path: "/login",
        element: Login
      },
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
        element: Register
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
                path: "manage-bookings",
                element: AdminManageBookings,
              },
              {
                path: "manage-users",
                element: AdminManageUsers,
              },
              {
                path: "manage-partners",
                element: AdminManagePartners,
              },
              {
                path: "manage-hotels",
                children: [
                  {
                    index: true,
                    element: AdminManageHotels,
                  },
                  {
                    path: "hotel-details/:hotelId",
                    element: AdminHotelDetails,
                  }
                ]
              },
              {
                path: "manage-conveniences",
                element: AdminManageConveniences,
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
                children: [
                  {
                    index: true,
                    element: ManageHotel,
                  },
                  {
                    path: "hotel-details/:hotelId",
                    element: PartnerHotelDetails,
                  }
                ]
              },
              {
                path: "manage-hotel/:id/edit",
                element: Edit
              },
              {
                path: "manage-hotel/:id/manage-room",
                element: Room
              },
              {
                path: "manage-hotel/:id/manage-room/create-room",
                element: CreateRoom
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
