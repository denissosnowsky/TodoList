import s from "./Logo.module.css";

import { HTMLElementView, View } from "@/types";
import logo from "@/assets/logo.png";

type LogoProps = {
  size: "large" | "small";
};

class Logo extends View<LogoProps> {
  private wrapperClassName: string;

  constructor(props: LogoProps) {
    super(props);
    this.wrapperClassName =
      this.props.size === "large" ? s.wrapperLarge : s.wrapperSmall;
  }

  public createComponent(): HTMLElementView {
    const img: HTMLImageElement = this.createElement("img", [], s.image);
    img.src = logo;

    const wrapper = this.createElement("div", [img], this.wrapperClassName);

    return wrapper;
  }
}

export default Logo;
