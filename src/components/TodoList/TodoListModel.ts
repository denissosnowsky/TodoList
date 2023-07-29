import { v4 as uuidv4 } from "uuid";

import { Model, TodoListItem, TodoListItemStatus } from "@/types";

class TodoListModel extends Model {
  private localStorageKey = "todolist";

  constructor() {
    super();
  }

  public getList(): TodoListItem[] {
    return this.getDataFromLocalStorage();
  }

  public addItem(text: string): void {
    const list = this.getDataFromLocalStorage();

    list.unshift(new TodoListItem(text, uuidv4()));

    this.setDataToLocalStorage(list);
  }

  public deleteItem(itemId: string): void {
    let list = this.getDataFromLocalStorage();

    list = list.filter(({ id }) => !(itemId === id));

    this.setDataToLocalStorage(list);
  }

  public changeStatus(itemId: string, status: TodoListItemStatus): void {
    let list = this.getDataFromLocalStorage();

    list = list.map((item) =>
      itemId === item.id ? { ...item, status } : item
    );

    this.setDataToLocalStorage(list);
  }

  private getDataFromLocalStorage(): TodoListItem[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey)) ?? [];
  }

  private setDataToLocalStorage(list: TodoListItem[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(list));
  }
}

export default TodoListModel;
