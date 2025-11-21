import { createContext, useContext, useCallback, useMemo } from "react";

const GTagContext = createContext(null);

export const GTagProvider = ({ children, measurementId }) => {
  const safeGtag = (...args) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag(...args);
    }
  };

  const trackNavigation = useCallback((to) => {
    safeGtag("event", "navigate", { destination: to });
  }, []);

  const trackPlanetSelect = useCallback((planetId) => {
    if (!planetId) return;
    safeGtag("event", "select_planet", { planet_id: planetId });
  }, []);

  const trackOverlayOpen = useCallback((overlayType, overlayId) => {
    safeGtag("event", "open_overlay", {
      type: overlayType,
      id: overlayId,
    });
  }, []);

  const trackOverlayClose = useCallback((overlayType, overlayId) => {
    safeGtag("event", "close_overlay", {
      type: overlayType,
      id: overlayId,
    });
  }, []);

  const trackExternalLink = useCallback((platform, url) => {
    safeGtag("event", "external_click", {
      platform,
      url,
    });
  }, []);

  const trackSettingToggle = useCallback((name, value) => {
    safeGtag("event", "setting_change", {
      setting: name,
      value: String(value),
    });
  }, []);

  const trackPageView = useCallback(
    (path, title) => {
      if (!measurementId) return;
      safeGtag("config", measurementId, {
        page_path: path,
        page_title: title || document.title,
      });
    },
    [measurementId]
  );

  const trackEvent = useCallback(
    (action, params = {}) => {
      if (!measurementId) return;
      safeGtag("event", action, params);
    },
    [measurementId]
  );

  const value = useMemo(
    () => ({
      trackPageView,
      trackEvent,
      trackNavigation,
      trackPlanetSelect,
      trackOverlayOpen,
      trackOverlayClose,
      trackExternalLink,
      trackSettingToggle,
    }),
    [
      trackPageView,
      trackEvent,
      trackNavigation,
      trackPlanetSelect,
      trackOverlayOpen,
      trackOverlayClose,
      trackExternalLink,
      trackSettingToggle,
    ]
  );

  return (
    <GTagContext.Provider value={value}>{children}</GTagContext.Provider>
  );
};

export const useGTag = () => {
  const ctx = useContext(GTagContext);
  if (!ctx) {
    throw new Error("useGTag must be used within a GTagProvider");
  }
  return ctx;
};
