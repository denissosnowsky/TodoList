import { TodoListItemStatus } from "./common";

class TodoListItem {
  public id: string;
  public text: string;
  public status: TodoListItemStatus;

  constructor(_text: string, _id: string) {
    this.id = _id;
    this.text = _text;
    this.status = TodoListItemStatus.TO_DO;
  }
}

export default TodoListItem;
