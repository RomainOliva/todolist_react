import React from 'react';

const SweetAlert = require('react-swal');

/*
 * Display remove button for each todolist item
 *
 * Parameter needed in the props :
 * - onRemoveItemClick: an handler for remove an item in 'TodoItemRow'
 */
export default class RemoveItem extends React.Component {
  /*callAlert() {
    return (
      <SweetAlert isOpen={true}
        type="warning"
        confirmButtonText="Yup"
        cancelButtonText="Nope"
        callback={isConfirm => {
                      if (isConfirm)
                        <SweetAlert isOpen={true} type="success" callback={this.props.onRemoveItemClick} />
                      else
                        <SweetAlert isOpen={true} type="error" />
                    }} />
    );
  }*/

  render() {
    return (
      <a onClick={this.props.onRemoveItemClick}>Remove</a>
    );
    //return <a onClick={this.props.onRemoveItemClick}>Remove</a>;
  }
}
