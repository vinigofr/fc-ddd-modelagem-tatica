import EventHandlerInterface from "../../@shared/event.handler.interface";
import EventInterface from "../../@shared/event.interface";
import CustomerCreatedEvent from "../customerCreated.event";

export default
  class EnviaConsoleLog2Handler
  implements EventHandlerInterface<CustomerCreatedEvent> {

  handler(event: EventInterface): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}