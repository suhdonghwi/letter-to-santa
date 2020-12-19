import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";

import Root from "./routes";
import { init } from "emailjs-com";

const firebaseConfig = {
  apiKey: "AIzaSyBcEy7ZESIHxNlSVcPLtMat3TSoPjWJHzI",
  authDomain: "letter-to-santa-61efd.firebaseapp.com",
  projectId: "letter-to-santa-61efd",
  storageBucket: "letter-to-santa-61efd.appspot.com",
  messagingSenderId: "1082826458249",
  appId: "1:1082826458249:web:b4cf47d13705cd8776b258",
  measurementId: "G-8XMJXTNVCF",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

init("user_tbeVQ3Dgxtdq1fCYiQ2OB");

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
