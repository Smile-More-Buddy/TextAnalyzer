import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Alert from "./components/Alert";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  // Theme is applied via a data-theme attribute + CSS variables
  // (see index.css / App.css) instead of inline background colours.
  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      showAlert("Dark Mode Enable", "danger");
    } else {
      setMode("light");
      showAlert("Light Mode Enable", "info");
    }
  };

  return (
    <>
      <Navbar
        title="TextUtils"
        aboutText="About Us"
        mode={mode}
        toggleMode={toggleMode}
      />
      <Alert alert={alert} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="container my-5">
              <TextForm
                heading="Enter Your Text to Analyze"
                mode={mode}
                showAlert={showAlert}
              />
            </div>
          }
        />
        <Route exact path="/about" element={<About mode={mode} />} />
      </Routes>
    </>
  );
}

export default App;
