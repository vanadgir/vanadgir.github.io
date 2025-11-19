import { useState, useEffect } from "react";
import { documentsByTopic } from "../content/entries/documentMedia";

const DocumentsOverlay = ({ topicId }) => {
  const topic = documentsByTopic[topicId];

  if (!topic || !topic.docs || topic.docs.length === 0) {
    return (
      <article className="detail-pane">
        <header className="detail-pane-header">
          <h2>Documents</h2>
          <p className="detail-pane-subtitle">No documents found.</p>
        </header>
      </article>
    );
  }

  const { title, subtitle, docs } = topic;

  const [selectedId, setSelectedId] = useState(docs[0].id);

  useEffect(() => {
    if (docs.length > 0) {
      setSelectedId(docs[0].id);
    }
  }, [topicId, docs]);

  const selectedDoc = docs.find((d) => d.id === selectedId) ?? docs[0];

  return (
    <article className="detail-pane detail-pane--docs">
      <header className="detail-pane-header">
        <h2>{title}</h2>
        {subtitle && <p className="detail-pane-subtitle">{subtitle}</p>}
      </header>

      <section className="detail-pane-body detail-pane-body--docs">
        {/* Top: all the buttons */}
        <div className="docs-controls-row">
          <aside className="docs-list">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className={
                  "docs-item" +
                  (doc.id === selectedId ? " docs-item--active" : "")
                }
              >
                <button
                  type="button"
                  className="docs-item-title"
                  onClick={() => setSelectedId(doc.id)}
                >
                  {doc.label}
                </button>

                <div className="docs-item-actions">
                  <button
                    type="button"
                    className="docs-action-button"
                    onClick={() =>
                      window.open(doc.url, "_blank", "noopener,noreferrer")
                    }
                  >
                    View
                  </button>

                  <a
                    href={doc.url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="docs-action-button"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </aside>
        </div>

        {/* Bottom: full-width preview */}
        <div className="docs-viewer">
          <iframe
            src={selectedDoc.url}
            title={selectedDoc.label}
            className="docs-viewer-frame"
          />
        </div>
      </section>
    </article>
  );
};

export default DocumentsOverlay;
