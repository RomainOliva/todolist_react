import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Import of component
import Todolist from "./Todolist";

//Import of sweetAlert
const SweetAlert = require('react-swal');
require("../node_modules/sweetalert/dist/sweetalert.css");
require("../node_modules/sweetalert/dist/sweetalert.min.js");

/*
 * Display custom alert
 */
/*class Alert extends React.Component {
  render() {
    return (
      <SweetAlert isOpen={activeAlert}
            type="warning"
            confirmButtonText="Yup"
            cancelButtonText="Nope"
            callback={this.props.onRemoveItem(this.props.item.id)} />
    );
  }
}*/

//Hook the render on the "root" DOM element
const element = (
  <Todolist />
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
