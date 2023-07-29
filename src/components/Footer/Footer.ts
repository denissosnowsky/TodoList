import s from "./Footer.module.css";

import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { HTMLElementView, View } from "@/types";

class Footer extends View {
  public createComponent(): HTMLElementView {
    const logo = new Logo({ size: "small" }).createComponent();
    const navbar = new Navbar({
      type: "column",
      font: "small",
    }).createComponent();

    const leftBlock = this.createElement("div", [navbar], s.left);
    const rightBlock = this.createElement("div", [logo], s.right);
    const wrapper = this.createElement(
      "div",
      [leftBlock, rightBlock],
      s.wrapper
    );

    return wrapper;
  }
}

export default Footer;
