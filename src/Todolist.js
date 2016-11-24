import React from 'react';
import TodoTable from "./TodoTable";

//Construct the final rendering
class Todolist extends React.Component {
  render() {
    return (
      <div className="todolistWrapper">
        <h1>ToDo List</h1>

        <TodoTable />
      </div>
    );
  }
}
