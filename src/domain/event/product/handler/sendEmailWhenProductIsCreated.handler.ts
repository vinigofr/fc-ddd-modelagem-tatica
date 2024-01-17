import EventHandlerInterface from "../../@shared/event.handler.interface";
import EventInterface from "../../@shared/event.interface";
import ProductCreatedEvent from "../productCreated.event";

export default
  class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent> {

  handler(event: EventInterface): void {
    console.log(`Sending email to ${event.eventData.user.email}`);
  }
}