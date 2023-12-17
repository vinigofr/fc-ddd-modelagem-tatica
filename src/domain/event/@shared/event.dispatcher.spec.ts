describe("Domain events tests", () => {
  test("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendAnEmailWhenProductIsCreatedHandler();

    const eventName = "ProductCreatedEvent"
    eventDispatcher.register(eventName, eventHandler);

    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
  });

})