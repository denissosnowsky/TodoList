import s from "./TodoItem.module.css";

import {
  HTMLElementView,
  TodoListItem,
  TodoListItemStatus,
  View,
} from "@/types";

type TodoItemProps = TodoListItem & {
  index: number;
  deleteItem: (id: string) => void;
  changeItemStatus: (id: string, status: TodoListItemStatus) => void;
};

class TodoItem extends View<TodoItemProps> {
  private checkIconStyle = `fa-solid fa-square-check`;
  private pendingIconStyle = `fa-solid fa-clock`;
  private todoIconStyle = `fa-regular fa-square`;
  private deleteIconStyle = `fa-solid fa-trash`;

  constructor(props: TodoItemProps) {
    super(props);
    this.defineActiveIcon(props.status);
  }

  public createComponent(): HTMLElementView {
    const checkIcon = this.createElement("i", [], this.checkIconStyle);
    const pendingIcon = this.createElement("i", [], this.pendingIconStyle);
    const todoIcon = this.createElement("i", [], this.todoIconStyle);
    const deleteIcon = this.createElement("i", [], this.deleteIconStyle);

    this.bindListener("click", checkIcon, () => {
      this.props.changeItemStatus(this.props.id, TodoListItemStatus.DONE);
      this.defineActiveIcon(TodoListItemStatus.DONE);
    });
    this.bindListener("click", pendingIcon, () => {
      this.props.changeItemStatus(this.props.id, TodoListItemStatus.PENDING);
      this.defineActiveIcon(TodoListItemStatus.PENDING);
    });
    this.bindListener("click", todoIcon, () => {
      this.props.changeItemStatus(this.props.id, TodoListItemStatus.TO_DO);
      this.defineActiveIcon(TodoListItemStatus.TO_DO);
    });
    this.bindListener("click", deleteIcon, () => {
      this.props.deleteItem(this.props.id);
    });

    const leftBlock = this.createElement("div", [], s.left);
    leftBlock.textContent = `${this.props.index + 1}.`;

    const rightBlock = this.createElement(
      "div",
      [checkIcon, pendingIcon, todoIcon, deleteIcon],
      s.right
    );

    const centerBlock = this.createElement("div", [], s.center);
    centerBlock.textContent = `${this.props.text}`;

    const wrapper = this.createElement(
      "div",
      [leftBlock, centerBlock, rightBlock],
      s.wrapper
    );

    return wrapper;
  }

  private defineActiveIcon(status: TodoListItemStatus) {
    switch (status) {
      case TodoListItemStatus.DONE:
        this.checkIconStyle = this.appendActiveClass(this.checkIconStyle);
        this.pendingIconStyle = this.removeActiveClass(this.pendingIconStyle);
        this.todoIconStyle = this.removeActiveClass(this.todoIconStyle);
        break;
      case TodoListItemStatus.PENDING:
        this.pendingIconStyle = this.appendActiveClass(this.pendingIconStyle);
        this.checkIconStyle = this.removeActiveClass(this.checkIconStyle);
        this.todoIconStyle = this.removeActiveClass(this.todoIconStyle);
        break;
      case TodoListItemStatus.TO_DO:
        this.todoIconStyle = this.appendActiveClass(this.todoIconStyle);
        this.pendingIconStyle = this.removeActiveClass(this.pendingIconStyle);
        this.checkIconStyle = this.removeActiveClass(this.checkIconStyle);
        break;
    }
  }

  private appendActiveClass(className: string): string {
    return `${className} ${s.active}`;
  }

  private removeActiveClass(className: string): string {
    return className.replace(`${s.active}`, "");
  }
}

export default TodoItem;
