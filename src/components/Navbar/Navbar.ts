import s from "./Navbar.module.css";

import { HTMLElementView, View } from "@/types";

import { Link } from "./types";
import { navbarLinks } from "./constants";

type NavbarProps = {
  type: "row" | "column";
  font: "normal" | "small";
};

class Navbar extends View<NavbarProps> {
  private links: Link[];
  private wrapperClassName: string;

  constructor(props: NavbarProps) {
    super(props);
    this.links = navbarLinks;
    this.wrapperClassName = `${s.wrapper} ${s[this.props.type]} ${
      s[this.props.font]
    }`;
  }

  public createComponent(): HTMLElementView {
    const wrapperChildren: HTMLElementView[] = this.links.map(
      ({ href, text }) => {
        const link: HTMLAnchorElement = this.createElement("a", [], s.link);
        link.href = href;
        link.textContent = text;

        return link;
      }
    );

    const wrapper = this.createElement(
      "div",
      wrapperChildren,
      this.wrapperClassName
    );

    return wrapper;
  }
}

export default Navbar;
