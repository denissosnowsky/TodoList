import s from "./App.module.css";

import { HTMLElementView, View } from "@/types";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TodoList } from "@/components/TodoList";

class App extends View {
  createComponent(): HTMLElementView {
    const header = new Header().createComponent();
    const footer = new Footer().createComponent();
    const todoList = new TodoList().createComponent();

    const container = new Container({ children: [todoList] }).createComponent();

    const wrapper = this.createElement(
      "div",
      [header, container, footer],
      s.wrapper
    );

    return wrapper;
  }
}

export default App;
