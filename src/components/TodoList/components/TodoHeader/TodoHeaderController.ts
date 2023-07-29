import { Controller, Model } from "@/types";

import TodoHeaderModel from "./TodoHeaderModel";

class TodoHeaderController extends Controller<TodoHeaderModel> {
  constructor() {
    super();
    this.model = new TodoHeaderModel();
  }

  public setInputValue(value: string): string {
    return this.model.setInputValue(value);
  }

  public clickButton(): string {
    return this.model.clickButton();
  }
}

export default TodoHeaderController;
