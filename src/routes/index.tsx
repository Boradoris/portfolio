import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./config";

const AppRoutes = () => (
  <Routes>
    {routes.map(r => (
      <Route key={r.path} path={r.path} element={r.element} />
    ))}
    <Route path="*" element={<Navigate to="/portfolio" replace />} />
  </Routes>
);

export default AppRoutes;
