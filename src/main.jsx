import React from "react";
import { v4 as uuidv4 } from "uuid";
import "pointer-events-polyfill";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LevelsStore from "./Store/LevelsStore.js";

const id = uuidv4();
localStorage.setItem("tabs", id);

const storageHandler = () => {
  const storedId = localStorage.getItem("tabs");
  if (storedId !== id) {
    LevelsStore.getState().setIsActiveTab(false);
    LevelsStore.getState().setTabsId(id);
  }
};

window.addEventListener("storage", storageHandler);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
