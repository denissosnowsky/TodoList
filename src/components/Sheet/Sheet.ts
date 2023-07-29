import s from "./Sheet.module.css";

import { HTMLElementView, View } from "@/types";

type SheetProps = {
  children: HTMLElementView[];
};

class Sheet extends View {
  constructor(props: SheetProps) {
    super(props);
  }

  public createComponent(): HTMLElementView {
    const wrapper = this.createElement("div", this.children, s.wrapper);

    return wrapper;
  }
}

export default Sheet;
