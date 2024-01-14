import EventHandlerInterface from "../../@shared/event.handler.interface";
import EventInterface from "../../@shared/event.interface";
import CustomerCreatedEvent from "../customerCreated.event";

export default
  class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerCreatedEvent> {

  handler(event: EventInterface): void {
    console.log("address changed to:", event.eventData.address);
  }
}