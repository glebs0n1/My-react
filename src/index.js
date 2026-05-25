import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { LikesProvider } from "./Components/Like/LikesContext";

const container = document.getElementById("root");

const tree = (
  <React.StrictMode>
    <AuthProvider>
      <LikesProvider>
        <App />
      </LikesProvider>
    </AuthProvider>
  </React.StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
