import EventHandlerInterface from "../../../@shared/event/event.handler.interface";
import EventInterface from "../../../@shared/event/event.interface";
import CustomerCreatedEvent from "../customerCreated.event";

export default
  class EnviaConsoleLog1Handler
  implements EventHandlerInterface<CustomerCreatedEvent> {

  handler(event: EventInterface): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}