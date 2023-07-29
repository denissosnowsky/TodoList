import { Controller, TodoListItem, TodoListItemStatus } from "@/types";

import TodoListModel from "./TodoListModel";

class TodoListController extends Controller<TodoListModel> {
  constructor() {
    super();
    this.model = new TodoListModel();
  }

  public addItem(text: string): void {
    if (text.trim()) {
      this.model.addItem(text);
    }
  }

  public deleteItem(itemId: string): void {
    this.model.deleteItem(itemId);
  }

  public getList(): TodoListItem[] {
    return this.model.getList();
  }

  public changeStatus(id: string, status: TodoListItemStatus): void {
    return this.model.changeStatus(id, status);
  }
}

export default TodoListController;
