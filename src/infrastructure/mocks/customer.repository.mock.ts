import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer.repository.interface";

export default
  class CustomerRepositoryMock
  implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    console.log('customer created')
  }

  async update(customer: Customer): Promise<void> {
    console.log('customer updated')
  }

  async find(id: string): Promise<Customer> {
    console.log('customer found')
    return new Promise((resolve) => resolve(new Customer('1', 'Vinicius')))
  }

  async findAll(): Promise<Customer[]> {
    console.log('all customers retrivied')
    return new Promise((resolve) => resolve([new Customer('1', 'Vinicius')]))
  }
}
