import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Google Auth Provider
import App from "./App";
import "./index.css";

const GOOGLE_CLIENT_ID = "1036405315581-31vkkk0i0l3crjpdn3ruaa3dki0fpfr3.apps.googleusercontent.com"; // Your Google Client ID

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
