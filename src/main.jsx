import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClusterUIProvider } from "./contexts/ClusterUIContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClusterUIProvider>
      <App />
    </ClusterUIProvider>
  </StrictMode>
);
