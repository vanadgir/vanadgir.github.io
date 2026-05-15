export const musicPlatformsById = {
  youtube: {
    id: "youtube",
    label: "YouTube",
    profileUrl: "https://www.youtube.com/@BarnaldoYT",
    profileLabel: "YouTube Channel",
    embeds: [
      {
        id: "retrogothica-yt",
        title: "Retrogothica EP",
        iframeSrc:
          "https://www.youtube.com/embed?list=OLAK5uy_mg-i9beiAOkXMPr1Ikt4EitQh30icqr_Y",
      },
      {
        id: "midijam-yt",
        title: "midis2jam2 playlist",
        iframeSrc:
          "https://www.youtube.com/embed?list=PL2DqDbGGnooJ_fXODHT9UuvxJZyjmjuMO",
      },
    ],
  },

  soundcloud: {
    id: "soundcloud",
    label: "SoundCloud",
    profileUrl: "https://soundcloud.com/barntunes",
    profileLabel: "SoundCloud Artist Page",
    embeds: [
      {
        id: "barn-recommended",
        title: "Barn's Recommended",
        iframeSrc:
          "https://w.soundcloud.com/player/?url=https://soundcloud.com/barntunes/sets/barns-recommended",
      },
      {
        id: "untitled-ep-sc",
        title: "Untitled EP",
        iframeSrc:
          "https://w.soundcloud.com/player/?url=https://soundcloud.com/barntunes/sets/untitled-ep",
      },
      {
        id: "retrogothica-sc",
        title: "Retrogothica EP",
        iframeSrc:
          "https://w.soundcloud.com/player/?url=https://soundcloud.com/barntunes/sets/retrogothica-ep",
      },
    ],
  },

  spotify: {
    id: "spotify",
    label: "Spotify",
    profileUrl:
      "https://open.spotify.com/artist/6WKfqZPfMCk0DhCDzJT92M?si=NUvGgXCfTmynx5_PmostfA",
    profileLabel: "Spotify Artist Page",
    embeds: [
      {
        id: "resurrections-spotify",
        title: "Resurrections",
        iframeSrc:
          "https://open.spotify.com/embed/album/2DDctpIZwXRTE6rr0jx5d2",
      },
      {
        id: "retrogothica-ep-spotify",
        title: "Retrogothica EP",
        iframeSrc:
          "https://open.spotify.com/embed/album/1SOnl0iA2kZJb86d3VnlX0",
      },
    ],
  },

  bandcamp: {
    id: "bandcamp",
    label: "Bandcamp",
    profileUrl: "https://barnaldo.bandcamp.com/",
    profileLabel: "Bandcamp Profile",
    embeds: [
      {
        id: "untitled-ep-bc",
        title: "Untitled EP",
        iframeSrc:
          "https://bandcamp.com/EmbeddedPlayer/album=3663491662/size=large/bgcol=333333/linkcol=ffffff/tracklist=true/transparent=true/",
      },
      {
        id: "retrogothica-ep-bc",
        title: "Retrogothica EP",
        iframeSrc:
          "https://bandcamp.com/EmbeddedPlayer/album=3684439214/size=large/bgcol=333333/linkcol=ffffff/tracklist=true/transparent=true/",
      },
    ],
  },
};

// Useful for lists
export const musicPlatformList = Object.values(musicPlatformsById);
