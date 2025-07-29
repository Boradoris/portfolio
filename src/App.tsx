import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes";
import { ThemeProvider } from "./ThemeContext";

const App = () => (
  <ThemeProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
