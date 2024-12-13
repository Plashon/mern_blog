import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router/router";
import { RouterProvider } from "react-router";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./contexts/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </CookiesProvider>
  </StrictMode>
);
