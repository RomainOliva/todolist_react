import AppDispatcher       from "../dispatcher/AppDispatcher";
import TodoConstants    from "../constants/TodoConstants";
import { EventEmitter } from "events";

let data = {
  addingMode: false,
  items: [],
  content: ""
};

class TodoStore extends EventEmitter {
  getData() {
    return data;
  }

  changeContent( newContent ) {
    data.content = newContent;

    this.emitChange();
  }

  addItem( newItemContent ) {
    data.content = "";
    data.addingMode = false;

    let listItems = data.items;
    listItems.push({ content: newItemContent });

    data.items = listItems;

    this.emitChange();
  }

  removeItem( index ) {
    let items = data.items.filter( ( _, i ) => i !== index );
    data.items = items;
    this.emitChange();
  }

  showForm() {
    data.addingMode = true;
    this.emitChange();
  }

  hideForm() {
    data.addingMode = false;
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
