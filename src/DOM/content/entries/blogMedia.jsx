import myPic from "../../../assets/images/varunpfp.jpg";
import barnPic from "../../../assets/images/barnjam.jpg";

import GuestbookEntry from "./GuestbookEntry";
import { roadtripEntries } from "./roadtripEntries";

const aboutMeEntries = [
  {
    id: 0,
    body: () => (
      <article className="detail-pane">
        <section className="detail-pane-body">
          <div className="about-photo-wrapper">
            <img src={myPic} className="about-photo base" alt="" />
            <img src={barnPic} className="about-photo hover" alt="" />
          </div>
          <ul>
            <li>Software Engineer, Game Developer, Data Scientist</li>
            <li>I am 34 years old and live in Boston </li>
            <li>English (Fluent), Marathi (Conversational), Hindi (Basic)</li>
            <li>MS in Computer Science from Boston University</li>
            <li>BS in Mathematics from UMass Amherst</li>
            <li>Self-taught guitar, bass guitar, piano for ~20 years</li>
            <li>Definitely a cat person but love dogs too</li>
            <li>
              In my free time I'm probably playing/writing music, gaming, or
              waiting for my next D&D session
            </li>
          </ul>
        </section>
      </article>
    ),
  },
];

const guestbookEntries = [
  {
    id: 0,
    body: () => <GuestbookEntry />,
  },
];

export const blogsById = {
  about: {
    id: "about",
    label: "About Me",
    description: "My background, skills, and hobbies",
    entries: aboutMeEntries,
    hideNav: true,
  },

  guestbook: {
    id: "guestbook",
    label: "Guestbook",
    description:
      "Contact me!",
    entries: guestbookEntries,
    hideNav: true,
  },
  
  roadtrip2020: {
    id: "roadtrip2020",
    label: "Roadtrip 2020",
    description: "A journal of my cross-country adventure",
    entries: roadtripEntries,
    hideNav: false,
  },

};

// For the right-pane list:
export const blogList = Object.values(blogsById);
