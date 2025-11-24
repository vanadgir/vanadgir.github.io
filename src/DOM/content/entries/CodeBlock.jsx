import { useState } from "react";

const CodeBlock = ({ code, language = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore; you could add fallback UI if needed
    }
  };

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
        <code className={`code-block-code language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
