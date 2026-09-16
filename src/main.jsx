
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

import AppRouter from "./AppRouters/AppRouter";
import { AuthProvider } from "./store/Auth.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </BrowserRouter>
);

