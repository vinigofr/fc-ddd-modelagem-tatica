import SendEmailWhenProductIsCreatedHandler from "../product/handler/sendEmailWhenProductIsCreated.handler";
import EventDispatcher from "./event.dispatcher";

describe("Domain events tests", () => {
  test("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    const eventName = "ProductCreatedEvent"
    eventDispatcher.register(eventName, eventHandler);

    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
    expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler)
  });

  test("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    const eventName = "ProductCreatedEvent"
    eventDispatcher.register(eventName, eventHandler);

    eventDispatcher.unregister(eventName, eventHandler)

    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(0);
  });

  test("should not throw error when trying to unregister an event that was't registered before", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    const eventName = "ProductCreatedEvent"
    expect(() => eventDispatcher.unregister(eventName, eventHandler)).not.toThrow()
  });

  test("should unregister all event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    const eventName = "ProductCreatedEvent"
    eventDispatcher.register(eventName, eventHandler);

    eventDispatcher.unregisterAll()

    expect(eventDispatcher.getEventHandlers[eventName]).toBeUndefined();
  });

})