import EventHandlerInterface from "../../@shared/event.handler.interface";
import EventInterface from "../../@shared/event.interface";
import CustomerAddressChangedEvent from "../customerAddressChanged.event";

export default
  class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handler(event: EventInterface): void {
    console.log("address changed to:", event.eventData.address);
  }
}