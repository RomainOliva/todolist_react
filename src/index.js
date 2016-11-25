import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Import of component
import TodoApp  from "./js/components/TodoApp.react";

//Import of sweetAlert
require("../node_modules/sweetalert/dist/sweetalert.css");
require("../node_modules/sweetalert/dist/sweetalert.min.js");

//Hook the render on the "root" DOM element
const element = (
  <TodoApp />
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
