import React from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "@/routes";
import { ThemeProvider } from "./ThemeContext";

const App = () => (
  <ThemeProvider>
    <HashRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </HashRouter>
  </ThemeProvider>
);

export default App;
