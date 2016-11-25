import AppDispatcher       from "../dispatcher/AppDispatcher";
import TodoConstants    from "../constants/TodoConstants";
import { EventEmitter } from "events";

let allTodos = {
  addingMode: false,
  items: [],
  content: ""
};

class TodoStore extends EventEmitter {
  getAllTodo() {
    return allTodos;
  }

  changeContent( newContent ) {
    allTodos.content = newContent;

    this.emitChange();
  }

  addItem( newItemContent ) {
    allTodos.content = "";
    allTodos.addingMode = false;

    let listItems = allTodos.items;
    listItems.push({ content: newItemContent });

    allTodos.items = listItems;

    this.emitChange();
  }

  removeItem( index ) {
    let items = allTodos.items.filter( ( _, i ) => i !== index );
    allTodos.items = items;
    this.emitChange();
  }

  showForm() {
    allTodos.addingMode = true;
    this.emitChange();
  }

  hideForm() {
    allTodos.addingMode = false;
    this.emitChange();
  }

  emitChange() {
    this.emit( "change" );
  }

  addChangeListener( callback ) {
    this.on( "change", callback );
  }

  removeChangeListener( callback ) {
    this.removeListener( "change", callback );
  }
}

let store = new TodoStore();
export default store;

AppDispatcher.register( function( action ) {
  switch( action.actionType ) {

    case TodoConstants.TODO_CHANGE_CONTENT:
      store.changeContent( action.content );
      break;

    case TodoConstants.TODO_ADD:
      store.addItem( action.text );
      break;

    case TodoConstants.TODO_REMOVE:
      store.removeItem( action.index );
      break;

    case TodoConstants.TODO_SHOW_FORM:
      store.showForm();
      break;

    case TodoConstants.TODO_HIDE_FORM:
      store.hideForm();
      break;
    default:
  }
});
