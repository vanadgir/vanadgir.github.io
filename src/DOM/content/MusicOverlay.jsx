import { useEffect } from "react";
import { musicPlatformsById } from "./entries/musicMedia";
import { useGTag } from "../../contexts/GTagContext";

const MusicOverlay = ({ platformId }) => {
  const { trackExternalLink, trackEvent } = useGTag();
  const platform = musicPlatformsById[platformId];

  if (!platform) {
    return (
      <article className="detail-pane">
        <header className="detail-pane-header">
          <h2>Music</h2>
          <p className="detail-pane-subtitle">No platform data found.</p>
        </header>
      </article>
    );
  }

  const {
    label,
    subtitle,
    description,
    profileUrl,
    profileLabel,
    embeds = [],
  } = platform;

  useEffect(() => {
    trackEvent("music_platform_view", {
      platform_id: platformId,
      label,
    });
  }, [platformId, label, trackEvent]);

  return (
    <article className="detail-pane detail-pane--music">
      <header className="detail-pane-header">
        <h2>{label}</h2>
        {subtitle && <p className="detail-pane-subtitle">{subtitle}</p>}
        {description && <p className="detail-pane-subtitle">{description}</p>}
      </header>

      <section className="detail-pane-body">
        {/* TOP-OF-LIST PROFILE LINK */}
        {profileUrl && (
          <div className="music-profile-link-wrapper">
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="music-profile-link"
              onClick={() => trackExternalLink(platformId, profileUrl)}
            >
              {profileLabel || `Open my ${label} page`}
            </a>
          </div>
        )}

        {embeds.length === 0 && (
          <p>
            Embeds for this platform will go here. Configure them in{" "}
            <code>musicMedia.jsx</code>.
          </p>
        )}

        {embeds.map((embed) => (
          <div key={embed.id} className="music-embed-card">
            <h3 className="music-embed-title">{embed.title}</h3>
            {embed.note && <p className="music-embed-note">{embed.note}</p>}

            <div className="music-embed-frame-wrapper">
              <iframe
                src={embed.iframeSrc}
                title={embed.title}
                className="music-embed-frame"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                frameBorder="0"
                style={
                  embed.height
                    ? { height: embed.height, aspectRatio: "auto" }
                    : undefined
                }
              />
            </div>
          </div>
        ))}
      </section>
    </article>
  );
};

export default MusicOverlay;
