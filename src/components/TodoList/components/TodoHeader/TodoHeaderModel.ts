import { Model } from "@/types";

class TodoHeaderModel extends Model {
  private inputValue: string;

  constructor() {
    super();
    this.inputValue = "";
  }

  public setInputValue(value: string): string {
    this.inputValue = value;
    return this.inputValue;
  }

  public clickButton(): string {
    return this.setInputValue("");
  }
}

export default TodoHeaderModel;
