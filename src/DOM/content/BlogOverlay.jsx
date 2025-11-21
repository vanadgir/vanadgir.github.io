// src/content/BlogOverlay.jsx
import { useState, useRef, useEffect } from "react";
import { blogsById } from "../content/entries/blogMedia";

const BlogOverlay = ({ blogId }) => {
  const blog = blogsById[blogId];

  // Safety: missing blogId
  if (!blog) {
    return (
      <article className="detail-pane">
        <header className="detail-pane-header">
          <h2>Blog</h2>
          <p className="detail-pane-subtitle">Blog not found.</p>
        </header>
      </article>
    );
  }

  const { label, description, entries = [], hideNav } = blog;

  const [page, setPage] = useState(0);
  const maxPage = entries.length - 1;
  const bodyRef = useRef(null);

  const goTo = (index) => {
    if (index < 0 || index > maxPage) return;
    setPage(index);
  };

  const goHome = () => {
    goTo(0);
  };

  const goPrev = () => {
    goTo(page - 1);
  };

  const goNext = () => {
    goTo(page + 1);
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [page]);

  const entry = entries[page];

  return (
    <article className="detail-pane detail-pane--blog">
      <header className="detail-pane-header">
        <h2>{label}</h2>
        {description && <p className="detail-pane-subtitle">{description}</p>}
      </header>

      <section className="detail-pane-body" ref={bodyRef}>
        {entry ? (
          <div className="blog-entry-body">{entry.body({ goTo })}</div>
        ) : (
          <p>No entries yet.</p>
        )}
      </section>

      {!hideNav && entries.length > 1 && (
        <footer className="detail-pane-footer blog-nav">
          <button onClick={goPrev} disabled={page === 0}>
            &lt; Prev
          </button>
          <button onClick={goHome} disabled={page === 0}>
            Home
          </button>
          <button onClick={goNext} disabled={page === maxPage}>
            Next &gt;
          </button>
        </footer>
      )}
    </article>
  );
};

export default BlogOverlay;
