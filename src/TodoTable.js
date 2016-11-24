import React from 'react';
import TodoForm from "./TodoForm";
import TodoItemRow from "./TodoItemRow";

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
    let listItems = this.state.items;
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
    let listItems = this.state.items;
    let index = listItems.findIndex(item => { return item.id === i; });

    listItems.splice(index, 1);

    this.setState({ items: listItems });
  }

  //Display all todolist item, or specific sentence if they are no item
  //Display also the 'add item form' or the button for open it
  render() {
    let rows = this.state.items.map(item => <TodoItemRow item={item} key={item.id} onRemoveItem={this.handleRemoveItem}/>);

    if(rows.length === 0) {
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
