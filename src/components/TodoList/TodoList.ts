import s from "./TodoList.module.css";

import { Sheet } from "@/components/Sheet";
import {
  HTMLElementView,
  TodoListItem,
  TodoListItemStatus,
  View,
} from "@/types";

import { TodoHeader } from "./components/TodoHeader";
import { TodoItem } from "./components/TodoItem";
import TodoListController from "./TodoListController";
import { TodoListEvents } from "./constants";

class TodoList extends View<Object, TodoListController> {
  private noTodosText = "No todos yet";
  private sheetBlockElement: HTMLElementView;
  private todoListComponents: TodoItem[];
  private list: TodoListItem[];

  constructor() {
    super();
    this.controller = new TodoListController();
    this.list = this.controller.getList();
    this.addEvent(TodoListEvents.RERENDER_LIST, this.rerenderList.bind(this));
  }

  public createComponent(): HTMLElementView {
    const header = new TodoHeader({
      addItem: this.addTodoItem.bind(this),
    }).createComponent();

    const sheetBlockChildren = this.generateList();

    const sheetBlock = this.createElement(
      "div",
      sheetBlockChildren,
      s.sheetBlock
    );
    this.sheetBlockElement = sheetBlock;

    const sheet = new Sheet({ children: [sheetBlock] }).createComponent();

    const wrapper = this.createElement("div", [header, sheet], s.wrapper);

    return wrapper;
  }

  private addTodoItem = (text: string) => {
    this.controller.addItem(text);
    this.list = this.controller.getList();
    this.notifyEvent(TodoListEvents.RERENDER_LIST);
  };

  private deleteTodoItem = (id: string) => {
    this.controller.deleteItem(id);
    this.list = this.controller.getList();
    this.notifyEvent(TodoListEvents.RERENDER_LIST);
  };

  private changeTodoItemStatus = (id: string, status: TodoListItemStatus) => {
    this.controller.changeStatus(id, status);
    this.list = this.controller.getList();
    this.notifyEvent(TodoListEvents.RERENDER_LIST);
  };

  private generateList(): HTMLElementView[] {
    const noTodos = this.createElement("div", [], s.noTodos);
    noTodos.textContent = this.noTodosText;

    const todoItemComponents = this.list.map(
      (item, index) =>
        new TodoItem({
          ...item,
          index,
          deleteItem: this.deleteTodoItem.bind(this),
          changeItemStatus: this.changeTodoItemStatus.bind(this),
        })
    );
    const todoItems = todoItemComponents.map((item) => item.createComponent());

    this.todoListComponents = todoItemComponents;

    return todoItems.length ? todoItems : [noTodos];
  }

  private rerenderList() {
    this.todoListComponents.forEach((todoItem) => {
      todoItem.clearBoundListeners();
    });

    let newList = this.generateList();

    this.sheetBlockElement.replaceChildren(...newList);
  }
}

export default TodoList;
