import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../components/auth/Login";
import Layout from "../components/master/Layout";
import { AuthContext } from "../utils/AuthContext";
import Profile from "../pages/Profile";

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Route>

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
