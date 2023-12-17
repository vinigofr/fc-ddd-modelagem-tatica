import EventDispatcherInterface from "./event.dispatcher.interface";
import EventHandlerInterface from "./event.handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  get getEventHandlers() {
    return this.eventHandlers
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const indexOfEvent = this.eventHandlers[eventName].indexOf(eventHandler);

      if (indexOfEvent !== -1) {
        this.eventHandlers[eventName].splice(indexOfEvent, 1)
      }
    }
  }

  notify(event: EventInterface): void {
    throw new Error("method not implemented")
  }

  unregisterAll(): void {
    this.eventHandlers = {}
  }
}