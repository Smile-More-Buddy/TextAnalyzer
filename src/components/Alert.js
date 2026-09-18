import React from "react";

const ICONS = {
  success: "\u2713",
  danger: "\u2715",
  warning: "!",
  info: "i",
  primary: "\u2713",
  secondary: "\u2713",
  dark: "\u2715",
};

function Alert(props) {
  if (!props.alert)
    return <div className="ta-toast-region" aria-live="polite" />;

  const { type, msg } = props.alert;

  return (
    <div className="ta-toast-region" aria-live="polite">
      <div className={`ta-toast ta-toast--${type}`} role="alert">
        <span className="ta-toast-icon">{ICONS[type] || "\u2713"}</span>
        <span className="ta-toast-msg">{msg}</span>
        <span className="ta-toast-bar"></span>
      </div>
    </div>
  );
}

export default Alert;
