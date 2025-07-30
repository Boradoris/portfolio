import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes";
import { ThemeProvider } from "./ThemeContext";

const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

const App: React.FC = () => (
  <ThemeProvider>
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
