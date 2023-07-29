import s from "./Container.module.css";

import { HTMLElementView, View } from "@/types";

type ContainerProps = {
  children: HTMLElementView[];
};

class Container extends View<ContainerProps> {
  constructor(props: ContainerProps) {
    super(props);
  }

  public createComponent(): HTMLElementView {
    const wrapper = this.createElement("div", this.children, s.wrapper);

    return wrapper;
  }
}

export default Container;
