import EventHandlerInterface from "../../@shared/event.handler.interface";
import EventInterface from "../../@shared/event.interface";
import ProductCreatedEvent from "../productCreated.event";

export default
  class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent> {

  handler(event: EventInterface): void {
    // Neste cenário onde deixo apena um console.log, seria a ação a ser executada
    // Como o nome da classe já diz, enviaria um email
    console.log(`Sending email to ${event.eventData.email}`);
  }
}