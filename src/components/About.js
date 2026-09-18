import React from "react";

const FAQS = [
  {
    q: "What does TextUtils do?",
    a: "It converts pasted text to uppercase or lowercase, strips extra spaces, copies text to your clipboard, and gives you a live word count, character count and estimated reading time — all in the browser, nothing is sent anywhere.",
  },
  {
    q: "How is reading time calculated?",
    a: "Reading time is estimated at roughly 125 words per minute (0.008 minutes per word), rounded to two decimal places.",
  },
  {
    q: "Does my text get stored or uploaded?",
    a: "No. Everything runs client-side in React state — closing or refreshing the tab clears it, and nothing is sent to a server.",
  },
  {
    q: "Is there a dark mode?",
    a: "Yes — use the toggle in the top-right of the navbar. Your preference is applied instantly across the whole page.",
  },
];

export default function About(props) {
  return (
    <div className="container my-5">
      <div className="ta-hero">
        <span className="ta-eyebrow">Good to know</span>
        <h1 className="ta-heading">About TextUtils</h1>
      </div>

      <p className="ta-about-lead">
        TextUtils is a small, focused utility for cleaning up and inspecting
        plain text — case conversion, whitespace cleanup, clipboard copy, and
        live word / character / reading-time stats.
      </p>

      <div className="ta-faq">
        {FAQS.map((item, i) => (
          <details className="ta-faq-item" key={i}>
            <summary className="ta-faq-q">
              <span className="ta-faq-index mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.q}
            </summary>
            <p className="ta-faq-a">{item.a}</p>
          </details>
        ))}
      </div>

      <hr className="ta-divider" />
    </div>
  );
}
