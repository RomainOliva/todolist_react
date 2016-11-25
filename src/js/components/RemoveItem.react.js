import React from 'react';
import TodoStore  from "../stores/TodoStore";
import TodoActions  from "../actions/TodoActions";

export default class RemoveItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTodos: TodoStore.getAllTodo()
    };
  }

  onRemoveItemClick() {
    TodoActions.removeItem(this.props.index);
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
    return (
      <a onClick={ this.onRemoveItemClick.bind(this) }>Remove</a>
    );
  }
};
