import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../slices/auth.slice";
import { useSelector } from "react-redux";

const AuthGuard = ({ allowedRoles, children }) => {
  const tokenFromRedux = useSelector(selectCurrentToken);
  const role = useSelector(state => state.auth.role);
  const location = useLocation();
  const token = tokenFromRedux || sessionStorage.getItem('token') || localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (token && location.pathname === "/login") {
    return <Navigate to="/" />;
  };
  if (location.pathname === "/admin") {
    if (!role || role !== 'ROLE_ADMIN') {
      return <Navigate to="/404" replace />;
    }
  }
  if (location.pathname === "/partner") {
    if (!role || role !== 'ROLE_PARTNER') {
      return <Navigate to="/404" replace />;
    }
  }

  // return user ? <Outlet /> || { children } : <Navigate to="/404" replace />;
  return children ? children : <Outlet />;
};


export default AuthGuard;
