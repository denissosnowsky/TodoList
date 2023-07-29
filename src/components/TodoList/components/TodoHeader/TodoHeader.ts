import s from "./TodoHeader.module.css";

import { HTMLElementView, InputEvent, View } from "@/types";

import TodoHeaderController from "./TodoHeaderController";

type TodoHeaderProps = {
  addItem: (text: string) => void;
};

class TodoHeader extends View<TodoHeaderProps, TodoHeaderController> {
  private inputPlaceholder = "Add new todo here...";
  private iconStyle = `fa-solid fa-circle-plus ${s.button}`;

  constructor(props: TodoHeaderProps) {
    super(props);
    this.controller = new TodoHeaderController();
  }

  public createComponent(): HTMLElementView {
    const input: HTMLInputElement = this.createElement("input");
    input.placeholder = this.inputPlaceholder;
    this.bindListener("input", input, this.setInputValueListener(input));

    const button = this.createElement("i", [], this.iconStyle);
    this.bindListener("click", button, this.clickButtonListener(input));

    const wrapper = this.createElement("div", [input, button], s.wrapper);

    return wrapper;
  }

  private setInputValueListener =
    (input: HTMLInputElement) => (event: InputEvent) => {
      this.updateInputValue(
        input,
        this.controller.setInputValue(event.target.value)
      );
    };

  private clickButtonListener = (input: HTMLInputElement) => () => {
    this.props.addItem(input.value);
    this.updateInputValue(input, this.controller.clickButton());
  };

  private updateInputValue(input: HTMLInputElement, value: string) {
    input.value = value;
  }
}

export default TodoHeader;
