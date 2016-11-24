import React from 'react';

/*
 * This component handles the adding item form
 * Display a button or a form according to the 'addingMode' status
 *
 * Parameter needed in the props :
 * - items: array of all todolist item
 * - addingMode: currently adding item or not
 * - onUserInput: an handler for update items state in 'TodoTable'
 * - onNewItemClick: an handler for switch in addingMode or not
 */
export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Send user input to 'TodoTable' on form submit
  handleSubmit(event) {
    event.preventDefault();

    this.props.onUserInput( this.content.value );
  }

  render() {
    if(!this.props.addingMode) {
      return (
        <button onClick={this.props.onNewItemClick}>
          Add item
        </button>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="item..."
          ref={input => { this.content = input; }}
        />

        <input type="submit" value="Add" />
      </form>
    );
  }
}
