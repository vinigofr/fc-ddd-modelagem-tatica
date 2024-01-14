import CustomerRepository from "../../infrastructure/repository/customer.repository";
import Customer from "../entity/customer";
import EventDispatcher from "../event/@shared/event.dispatcher";
import CustomerCreatedEvent from "../event/customer/customerCreated.event";

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

  async create(customer: Customer) {
    await this.repository.create(customer)

    const customerCreatedEvent = new CustomerCreatedEvent({ data: 'some data here' })
    this.dispatcher.notify(customerCreatedEvent)
  }
}