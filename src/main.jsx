import { createRoot } from "react-dom/client";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouters/AppRouter";

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </>
);
