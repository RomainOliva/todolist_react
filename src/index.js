import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import update from 'react-addons-update';

class RemoveItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a onClick={this.props.onRemoveItemClick}>Remove</a>
    );
  }
}

class TodoItemRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

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

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onUserInput(
      this.id.value,
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
          value={this.props.content}
          ref={(input) => {
            this.id = this.props.items.length + 1;
            this.content = input;
          }}
          onChange={this.handleChange}
        />

        <input type="submit" value="Add" />
      </form>
    );
  }
}

class TodoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [
                    {id: 1, content: "Finir la todolist"},
                    {id: 2, content: "Voir le widget"},
                   ],
                   addingMode: false
                 };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleNewItemClick = this.handleNewItemClick.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleUserInput(id, content) {
    var itemToAdd = [{ id: id,content: content }];

    this.setState({
      items: update(this.state.items, { $push: itemToAdd }),
      addingMode: false
    });
  }

  handleNewItemClick() {
    this.setState({addingMode: true});
  }

  handleRemoveItem(i) {
    var listItems = this.state.items;

    var index = listItems.findIndex(function(item){
     return item.id === i;
    })

    this.setState({
      items: update(this.state.items, {$splice: [[index, 1]]})
    });
  }

  render() {
    var rows = [];

    this.state.items.forEach((item) => {
      rows.push(<TodoItemRow item={item} key={item.id} onRemoveItem={this.handleRemoveItem}/>);
    });

    if(rows.length == 0) {
      return (
        <table className="w100">
          <tbody>
            <tr>
              <td>there is no item currently</td>
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

ReactDOM.render(
  <Todolist />,
  document.getElementById('root')
);
