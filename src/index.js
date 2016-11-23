import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import update from 'react-addons-update';

/*
 * Display remove button for each todolist item
 *
 * Parameter needed in the props :
 * - onRemoveItemClick: an handler for remove an item in 'TodoItemRow'
 */
class RemoveItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <a onClick={this.props.onRemoveItemClick}>Remove</a>;
  }
}

/*
 * Display a line for every todolist item
 *
 * Parameter needed in the props :
 * - items: array of all todolist item
 * - onRemoveItem: an handler for remove an item from items state in 'TodoTable'
 */
class TodoItemRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  //Send a remove item request in 'TodoTable'
  handleRemoveItem() {
    this.props.onRemoveItem(this.props.item.id);
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
class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Send user input to 'TodoTable' on form submit
  handleSubmit(event) {
    this.props.onUserInput(
      this.props.items.length + 1,
      this.content.value
    );
    event.preventDefault();
  }

  render() {
    if(this.props.addingMode == false) {
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
          ref={(input) => { this.content = input; }}
        />

        <input type="submit" value="Add" />
      </form>
    );
  }
}

//Owner of the two needed states : 'items' and 'addingMode'
//It's the common owner component above all the components that need the state (TodoForm / TodoItemRow)
class TodoTable extends React.Component {
  constructor(props) {
    super(props);

    //the two state of the application
    //items: list of all todolist item
    //addingMode: if the user is currently adding a todolist item or not
    this.state = { items: [], addingMode: false };

    //bind all needed handler
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleNewItemClick = this.handleNewItemClick.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  //Add an item in the 'item state' according to user input (given in param) and close the adding item form
  handleUserInput(id, content) {
    var listItems = this.state.items;
    listItems.push({ id: id, content: content });

    this.setState({
      items: listItems,
      addingMode: false
    });
  }

  //Display the adding item form
  handleNewItemClick() {
    this.setState({addingMode: true});
  }

  //Remove the item in the state "item" according to the 'id' in parameter
  handleRemoveItem(i) {
    var listItems = this.state.items;
    var index = listItems.findIndex((item) => {
     return item.id === i;
    });

    listItems.splice(index, 1);

    this.setState({ items: listItems });
  }

  //Display all todolist item, or specific sentence if they are no item
  //Display also the 'add item form' or the button for open it
  render() {
    var rows = [];

    this.state.items.forEach((item) => {
      rows.push(<TodoItemRow item={item} key={item.id} onRemoveItem={this.handleRemoveItem}/>);
    });

    if(rows.length == 0) {
      return (
        <table className="w100">
          <tbody>
            <tr className="todoItemWrapper">
              <td>There is no item currently</td>
            </tr>
            <tr>
              <td>
                <TodoForm
                  items={this.state.items}
                  addingMode={this.state.addingMode}
                  onUserInput={this.handleUserInput}
                  onNewItemClick={this.handleNewItemClick}
                />
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
        <TodoForm
          items={this.state.items}
          addingMode={this.state.addingMode}
          onUserInput={this.handleUserInput}
          onNewItemClick={this.handleNewItemClick}
        />
      </div>
    );
  }
}

//Construct the final rendering
class Todolist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="todolistWrapper">
        <h1>ToDo List</h1>

        <TodoTable />
      </div>
    );
  }
}

//Hook the render on the "root" DOM element
const element = (
  <Todolist />
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
