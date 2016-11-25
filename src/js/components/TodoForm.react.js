import React from 'react';
import TodoStore  from "../stores/TodoStore";
import TodoActions  from "../actions/TodoActions";

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTodos: TodoStore.getAllTodo()
    };
  }

  onSubmit(event) {
    event.preventDefault();

    TodoActions.addItem(this.state.allTodos.content);
  }

  onNewItemClick() {
    TodoActions.showForm();
  }

  changeContent(event) {
    TodoActions.changeContent(event.target.value);
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
      allTodos: TodoStore.getAllTodo()
    });
  }

  /**
   * @return
   */
  render() {
    if( !this.state.allTodos.addingMode ) {
      return (
        <button onClick={ this.onNewItemClick }>
          Add item
        </button>
      );
    }
    return (
      <form onSubmit= { this.onSubmit.bind(this) } >
        <input
          type="text"
          placeholder="item..."
          value={ this.state.allTodos.content }
          onChange={ this.changeContent.bind(this) } />

        <input type="submit" value="Add" />
      </form>
    );
  }
};
