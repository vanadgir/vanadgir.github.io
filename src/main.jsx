import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PlanetUIProvider } from "./contexts/PlanetUIContext.jsx";
import App from "./App.jsx";
import { SettingsProvider } from "./contexts/SettingsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <PlanetUIProvider>
        <App />
      </PlanetUIProvider>
    </SettingsProvider>
  </StrictMode>
);
