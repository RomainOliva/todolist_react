import AppDispatcher  from "../dispatcher/AppDispatcher";
import TodoConstants  from "../constants/TodoConstants";

export default {

  changeContent: function(content) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CHANGE_CONTENT,
      content: content
    });
  },

  /**
   * @param  {string} text
   */
  addItem: function(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_ADD,
      text: text
    });
  },

  removeItem: function(index) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REMOVE,
      index: index
    });
  },

  showForm: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_SHOW_FORM
    });
  },

  hideForm: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_HIDE_FORM
    });
  }
};
