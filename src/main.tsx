import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppProviders } from "./components/AppProviders.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
