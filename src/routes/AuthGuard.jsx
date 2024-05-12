import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = ({ allowedRoles, children }) => {
  // const user = useAppSelector((state) => state.user.user);
  console.log("AuthGuard run");

  // return user ? <Outlet /> || { children } : <Navigate to="/404" replace />;
  return <Outlet />;
};

export default AuthGuard;
