import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="1055304449523-ljtlpv0emsjn40akaum4q1b9silmmfsf.apps.googleusercontent.com"> */}
      <App />
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
