import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react"

import reportWebVitals from "./reportWebVitals";
import App from "./App";

import "index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
