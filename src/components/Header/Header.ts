import s from "./Header.module.css";

import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { HTMLElementView, View } from "@/types";

class Header extends View {
  public createComponent(): HTMLElementView {
    const logo = new Logo({ size: "large" }).createComponent();
    const navbar = new Navbar({ type: "row", font: "normal" }).createComponent();

    const leftBlock = this.createElement("div", [logo], s.left);
    const rightBlock = this.createElement("div", [navbar], s.right);
    const wrapper = this.createElement(
      "div",
      [leftBlock, rightBlock],
      s.wrapper
    );

    return wrapper;
  }
}

export default Header;
