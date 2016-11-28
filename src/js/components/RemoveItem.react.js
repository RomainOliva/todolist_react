import React from 'react';
import TodoActions  from "../actions/TodoActions";

export default class RemoveItem extends React.Component {
  onRemoveItemClick() {
    TodoActions.removeItem(this.props.index);
  }

  render() {
    return (
      <a onClick={ this.onRemoveItemClick.bind(this) }>Remove</a>
    );
  }
};
