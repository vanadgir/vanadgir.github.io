import { useState, useRef, useEffect } from "react";
import { roadtripEntries } from "./entries/roadtripEntries";

const RoadtripBlogOverlay = () => {
  const [page, setPage] = useState(0);
  const maxPage = roadtripEntries.length - 1;

  const bodyRef = useRef();

  const goTo = (index) => {
    setPage(index);
  };

  // Scroll to top on page change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [page]);

  const EntryBody = roadtripEntries[page].body;

  return (
    <article className="detail-pane">
      <header className="detail-pane-header">
        <h2>Roadtrip2020</h2>
        <p className="detail-pane-subtitle">From Boston MA to Oakland CA</p>
      </header>

      <section className="detail-pane-body" ref={bodyRef}>
        <EntryBody goTo={goTo} />
      </section>

      <footer className="detail-pane-footer">
        <button onClick={() => goTo(page - 1)} disabled={page === 0}>
          &lt;
        </button>

        <button onClick={() => goTo(0)} disabled={page === 0}>
          Home
        </button>

        <button onClick={() => goTo(page + 1)} disabled={page === maxPage}>
          &gt;
        </button>
      </footer>
    </article>
  );
};

export default RoadtripBlogOverlay;
