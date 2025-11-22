import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  MantineProvider,
  ColorSchemeScript,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorSchemeScript defaultColorScheme="light" />
    <MantineProvider defaultColorScheme="light">
      <Notifications />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
