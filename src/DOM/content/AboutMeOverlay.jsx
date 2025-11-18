const AboutMeOverlay = () => {
  return (
    <article className="detail-pane">
      <header className="detail-pane-header">
        <h2>About Me</h2>
        <p className="detail-pane-subtitle">aka my IRL statistics</p>
      </header>

      <section className="detail-pane-body">
          <ul>
            <li>Software Engineer, Game Developer, Data Scientist</li>
            <li>I am 34 years old and live in Boston </li>
            <li>MS in Computer Science from Boston University</li>
            <li>BS in Mathematics from UMass Amherst</li>
            <li>Self-taught guitar, bass guitar, piano for ~20 years</li>
            <li>
              In my free time I'm probably playing/writing music, gaming, or
              waiting for my next D&D session
            </li>
          </ul>
      </section>
    </article>
  );
};

export default AboutMeOverlay;
