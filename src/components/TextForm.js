import React, { useState, useEffect, useRef } from "react";

// Small icon set (inline SVG, no external icon library needed)
const IconUpper = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
  >
    <path d="M4 4h6M7 4v16M14 20l4-11 4 11M15.5 16h5" />
  </svg>
);
const IconLower = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
  >
    <circle cx="8" cy="15" r="4" />
    <path d="M12 6v13M16 18a4 4 0 1 0 4-4v4" />
  </svg>
);
const IconClear = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
  >
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
  </svg>
);
const IconCopy = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
  >
    <rect x="8" y="8" width="12" height="12" />
    <path d="M4 16V4h12" />
  </svg>
);
const IconSpace = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
  >
    <path d="M4 12h16M4 12l3-3M4 12l3 3M20 12l-3-3M20 12l-3 3" />
  </svg>
);

// Animates a number counting up/down toward `value` — purely presentational.
function useCountUp(value, duration = 280) {
  const [display, setDisplay] = useState(value);
  const frame = useRef(null);
  const from = useRef(value);

  useEffect(() => {
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const startVal = from.current;
    const delta = value - startVal;

    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + delta * eased));
      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        from.current = value;
      }
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return display;
}

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase !", "success");
  };

  const handleCopy = () => {
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    document.getSelection().removeAllRanges();
    props.showAlert("Text has been Copied to Clipboard !", "secondary");
  };

  const handleExtraSpace = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("ExtraSpace Has Been Removed!", "dark");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text has been deleted !", "warning");
  };

  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase !", "primary");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");

  const wordCount = text.split(/\s+/).filter((element) => {
    return element.length !== 0;
  }).length;
  const charCount = text.length;
  const readTime = (0.008 * wordCount).toFixed(2);

  const animatedWords = useCountUp(wordCount);
  const animatedChars = useCountUp(charCount);

  return (
    <>
      <div className="ta-hero">
        <span className="ta-eyebrow">Plain-text utility</span>
        <h1 className="ta-heading">{props.heading}</h1>
      </div>

      <div className="ta-panel">
        <div className="ta-field-label">
          <span>Input</span>
          <span className="mono">{charCount} ch</span>
        </div>
        <textarea
          className="ta-textarea form-control"
          id="myBox"
          rows="8"
          placeholder="Paste or type your text here..."
          onChange={handleOnChange}
          value={text}
        ></textarea>

        <div className="ta-toolbar">
          <button
            disabled={text.length === 0}
            className="ta-btn ta-btn-accent"
            onClick={handleUpClick}
          >
            <IconUpper />
            Uppercase
          </button>
          <button
            disabled={text.length === 0}
            className="ta-btn"
            onClick={handleLowClick}
          >
            <IconLower />
            Lowercase
          </button>
          <button
            disabled={text.length === 0}
            className="ta-btn"
            onClick={handleExtraSpace}
          >
            <IconSpace />
            Remove Spaces
          </button>
          <button
            disabled={text.length === 0}
            className="ta-btn"
            onClick={handleCopy}
          >
            <IconCopy />
            Copy
          </button>
          <button
            disabled={text.length === 0}
            className="ta-btn"
            onClick={handleClearClick}
          >
            <IconClear />
            Clear
          </button>
        </div>
      </div>

      <div className="ta-stats">
        <div className="ta-stat">
          <div className="ta-stat-value mono">{animatedWords}</div>
          <div className="ta-stat-label">Words</div>
        </div>
        <div className="ta-stat">
          <div className="ta-stat-value mono">{animatedChars}</div>
          <div className="ta-stat-label">Characters</div>
        </div>
        <div className="ta-stat">
          <div className="ta-stat-value mono">{readTime}</div>
          <div className="ta-stat-label">Minutes to read</div>
        </div>
      </div>

      <div className="ta-preview">
        <div className="ta-preview-title">Preview</div>
        <p className={`ta-preview-body ${text.length === 0 ? "is-empty" : ""}`}>
          {text.length > 0 ? text : "Nothing to preview."}
        </p>
      </div>

      <hr className="ta-divider" />
    </>
  );
}
