import React from 'react';
import TodoStore  from "../stores/TodoStore";
import TodoTable  from "./TodoTable.react";

export default class TodoApp extends React.Component {
  render() {
    return (
      <div className="todolistWrapper">
        <h1>ToDo List</h1>

        <TodoTable />
      </div>
    );
  }
};
