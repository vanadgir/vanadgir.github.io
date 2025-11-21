import OverlayContentLink from "../OverlayContentLink";
import { musicPlatformList } from "../../content/entries/musicMedia";

const MusicInfo = ({ planet, openDetail }) => {
  const handleOpenPlatform = (platformId) => {
    openDetail?.(`music:${platformId}`);
  };

  return (
    <div className="blog-info">
      <h2>{planet.label}</h2>
      <p>Releases & WIP</p>

      <ul className="info-item-list">
        {musicPlatformList.map((platform) => (
          <li key={platform.id} className="info-item-list-item">
            <OverlayContentLink
              title={platform.label}
              description={platform.subtitle}
              onActivate={() => handleOpenPlatform(platform.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicInfo;
