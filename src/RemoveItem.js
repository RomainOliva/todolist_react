import React from 'react';

/*
 * Display remove button for each todolist item
 *
 * Parameter needed in the props :
 * - onRemoveItemClick: an handler for remove an item in 'TodoItemRow'
 */
class RemoveItem extends React.Component {
  render() {
    return <a onClick={this.props.onRemoveItemClick}>Remove</a>;
  }
}
