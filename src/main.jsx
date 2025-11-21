import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PlanetUIProvider } from "./contexts/PlanetUIContext.jsx";
import { SettingsProvider } from "./contexts/SettingsContext.jsx";
import { GTagProvider } from "./contexts/GTagContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GTagProvider measurementId={"G-SBP8C5TMB1"}>
      <SettingsProvider>
        <PlanetUIProvider>
          <App />
        </PlanetUIProvider>
      </SettingsProvider>
    </GTagProvider>
  </StrictMode>
);
