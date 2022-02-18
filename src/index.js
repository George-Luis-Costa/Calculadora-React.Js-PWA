import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Calculator from "./main/Calculator"; //Troque o componente 'App' por 'Calculator'

ReactDOM.render(
  <div>
    <h1>Calculadora</h1>
    <Calculator />
  </div>,
  document.getElementById("root")
);
