import React from 'react';
import TodoStore  from "../stores/TodoStore";
import TodoTable  from "./TodoTable.react";

export default class TodoApp extends React.Component {
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
   * @return {object}
   */
  render() {
    return (
      <div className="todolistWrapper">
        <h1>ToDo List</h1>

        <TodoTable
          allTodos={this.state.allTodos}
        />
      </div>
    );
  }
};
