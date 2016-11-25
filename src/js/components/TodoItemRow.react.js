import React from 'react';
import RemoveItem  from "./RemoveItem.react";

export default class TodoItemRow extends React.Component {
  /**
   * @return
   */
  render() {
    return (
      <tr className="todoItemWrapper">
        <td className="left">{ this.props.item.content }</td>
        <td className="right">
          <RemoveItem index={this.props.index} />
        </td>
      </tr>
    );
  }
};
