export type HTMLElementView =
  HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export type InputEvent = Event & { target: EventTarget & { value: string } };

export enum TodoListItemStatus {
  TO_DO = "TO_DO",
  PENDING = "PENDING",
  DONE = "DONE",
}

export type EventView = Record<string, Function[]>;

export type BoundListener = {
  event: string;
  element: HTMLElementView;
  listener: EventListenerOrEventListenerObject;
};
