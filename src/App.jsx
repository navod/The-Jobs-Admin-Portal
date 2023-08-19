import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "./context";
import routes from "@/routes";
import { useContext, useEffect } from "react";
import { setupAxiosInterceptors } from "./services/interceptor";

function App() {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  setupAxiosInterceptors(() => {
    authContext.logout();
    navigate("/auth/sign-in");
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/sign-in");
    }
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route && route.type !== "auth") {
        return (
          <Route
            exact
            path={route.route}
            element={
              <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                {route.component}
              </ProtectedRoute>
            }
            key={route.key}
          />
        );
      }
      return null;
    });

  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      {getRoutes(routes)}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
