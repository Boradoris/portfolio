import React from "react";
import HomePage from "@/pages";
import { Navigate } from "react-router-dom";

export const routes = [
  { path: "/", element: <Navigate to="/portfolio" replace /> },
  { path: "/portfolio", element: <HomePage /> },
  { path: "/about", element: <HomePage /> },
  { path: "/history", element: <HomePage /> },
];
