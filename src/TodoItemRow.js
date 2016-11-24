import React from 'react';
import RemoveItem from "./RemoveItem";

/*
 * Display a line for every todolist item
 *
 * Parameter needed in the props :
 * - items: array of all todolist item
 * - onRemoveItem: an handler for remove an item from items state in 'TodoTable'
 */
export default class TodoItemRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  //Send a remove item request in 'TodoTable'
  handleRemoveItem() {
    this.props.onRemoveItem(this.props.index);
  }

  render() {
    return (
      <tr className="todoItemWrapper">
        <td className="left">{this.props.item.content}</td>
        <td className="right">
          <RemoveItem onRemoveItemClick={this.handleRemoveItem} />
        </td>
      </tr>
    );
  }
}
