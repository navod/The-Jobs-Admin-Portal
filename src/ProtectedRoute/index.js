import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = "/auth/sign-in",
  children,
}) => {
  return children;
};

export default ProtectedRoute;
