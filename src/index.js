import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "./index.css";
import Calculator from "./main/Calculator"; //Troque o componente 'App' por 'Calculator'

ReactDOM.render(
  <div>
    <h1>Calculadora</h1>
    <Calculator />
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
