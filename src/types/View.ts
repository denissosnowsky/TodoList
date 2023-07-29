import { BoundListener, Controller, EventView, HTMLElementView } from "@/types";

abstract class View<
  Props extends Object & { children?: HTMLElementView[] } = Object,
  C extends Controller = Controller
> {
  protected children: HTMLElementView[];
  protected controller?: C;
  protected props?: Props;
  private events: EventView;
  private boundListeners: BoundListener[];

  constructor(_props?: Props) {
    this.children = _props?.children ?? [];
    this.props = _props;
    this.events = {};
    this.boundListeners = [];
  }

  protected createElement<T extends HTMLElementView>(
    tag: keyof HTMLElementTagNameMap,
    children: HTMLElementView[] = [],
    className?: string
  ): T {
    let element: T = document.createElement(tag) as T;

    if (className) {
      element.className = className;
    }

    if (children.length) {
      element = children.reduce<T>((acc, child: T) => {
        acc.appendChild<T>(child);
        return acc;
      }, element);
    }

    return element;
  }

  protected bindListener(
    event: string,
    element: HTMLElementView,
    listener: EventListenerOrEventListenerObject
  ) {
    element.addEventListener(event, listener);
    this.boundListeners.push({ event, element, listener });
  }

  protected addEvent(key: string, callback: Function) {
    if (this.events[key]) {
      this.events[key].push(callback);
    } else {
      this.events[key] = [callback];
    }
  }

  protected removeEvent(key: string, callback: Function) {
    this.events[key] = this.events[key].filter((clb) => !(clb === callback));
  }

  protected notifyEvent(key: string) {
    if (this.events[key]) {
      this.events[key].forEach((clb) => {
        clb();
      });
    }
  }

  public clearBoundListeners() {
    this.boundListeners.forEach(({ element, event, listener }) => {
      element.removeEventListener(event, listener);
    });
    this.boundListeners = [];
  }

  public abstract createComponent(): HTMLElementView;
}

export default View;
