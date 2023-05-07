import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import { PrivateRoute } from "./PrivateRoutes";
import Edit from "../pages/Edit";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
