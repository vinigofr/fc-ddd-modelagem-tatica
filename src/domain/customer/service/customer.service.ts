import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Address from "../value-object/address";
import Customer from "../entity/customer";
import EventDispatcher from "../../@shared/event/event.dispatcher";
import CustomerAddressChangedEvent from "../event/customerAddressChanged.event";
import CustomerCreatedEvent from "../event/customerCreated.event";

export default class CustomerService {
  repository;
  dispatcher;

  constructor({
    repository,
    dispatcher
  }: {
    repository: CustomerRepository,
    dispatcher: EventDispatcher
  }) {
    this.repository = repository;
    this.dispatcher = dispatcher;
  }

  async create(customer: Customer): Promise<void> {
    await this.repository.create(customer)

    const customerCreatedEvent = new CustomerCreatedEvent({ data: 'some data here' })
    this.dispatcher.notify(customerCreatedEvent)
  }

  async changeAddress(customerId: string, address: Address): Promise<void> {

    const customer = await this.repository.find(customerId);
    customer.Address = address;

    await this.repository.update(customer)

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      address: address.toString()
    });

    this.dispatcher.notify(customerAddressChangedEvent);
  }
}