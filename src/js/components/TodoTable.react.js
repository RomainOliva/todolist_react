import React from 'react';
import TodoStore  from "../stores/TodoStore";
import TodoItemRow  from "./TodoItemRow.react";
import TodoForm  from "./TodoForm.react";

export default class TodoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTodos: TodoStore.getAllTodo()
    };
  }

  componentDidMount() {
    this._onChange = this.onChange.bind(this);
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  onChange() {
    this.setState({
      allTodos: TodoStore.getAllTodo(),
    });
  }

  /**
   * @return
   */
  render() {
    let rows = this.state.allTodos.items.map( ( item, i ) => <TodoItemRow item={item} key={i} index={i} /> );

    if(rows.length === 0) {
      return (
        <table className="w100">
          <tbody>
            <tr className="todoItemWrapper">
              <td>There is no item currently</td>
            </tr>
            <tr>
              <td>
                <TodoForm items={this.state.allTodos.items} />
                </td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <div>
        <table className="w100">
          <tbody>{rows}</tbody>
        </table>
        <TodoForm items={this.state.allTodos.items} />
      </div>
    );
  }
};
