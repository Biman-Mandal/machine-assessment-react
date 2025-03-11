import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Make sure we don't continuously trigger a re-render
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
