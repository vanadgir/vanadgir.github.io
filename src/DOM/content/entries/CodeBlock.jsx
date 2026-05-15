// src/DOM/content/entries/CodeBlock.jsx
import { useEffect, useState } from "react";
import { Highlight, themes, Prism } from "prism-react-renderer";

// Attach Prism to the global object so prismjs language plugins can extend it
if (typeof globalThis !== "undefined") {
  globalThis.Prism = Prism;
}

// Load Java language once per app
let javaLoadPromise = null;
function ensureJavaLanguage() {
  if (!javaLoadPromise) {
    javaLoadPromise = import("prismjs/components/prism-java");
  }
  return javaLoadPromise;
}

const CodeBlock = ({ code, language = "" }) => {
  const [javaReady, setJavaReady] = useState(language !== "java");

  useEffect(() => {
    if (language === "java") {
      ensureJavaLanguage().then(() => {
        // force a re-render once Java is registered
        setJavaReady(true);
      });
    } else {
      setJavaReady(true);
    }
  }, [language]);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  // Until Java is loaded, just show a plain <pre> so there is no crash/flash
  if (!javaReady) {
    return (
      <div className="code-block">
        <div className="code-block-header">
          {language && <span className="code-block-lang">{language}</span>}
          <button
            type="button"
            className="code-block-copy"
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="code-block-pre">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="code-block">
      <div className="code-block-header">
        {language && <span className="code-block-lang">{language}</span>}
        <button
          type="button"
          className="code-block-copy"
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <Highlight
        code={code.trim()}
        language={language || "tsx"}
        theme={themes.nightOwl}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`code-block-pre ${className}`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
