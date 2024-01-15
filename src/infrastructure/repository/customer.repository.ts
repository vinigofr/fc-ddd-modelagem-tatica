import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default
  class CustomerRepository
  implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      number: customer.Address.number,
      street: customer.Address.street,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update({
      name: customer.name,
      street: customer?.Address.street,
      number: customer?.Address.number,
      zipcode: customer?.Address.zip,
      city: customer?.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    }, { where: { id: customer.id } })
  }

  async find(id: string): Promise<Customer> {
    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true
      })
    } catch (error) {
      throw new Error("customer not found");
    }

    const customer = new Customer(id, customerModel?.name || '')
    const address = new Address(
      customerModel?.street,
      customerModel?.number,
      customerModel?.zipcode,
      customerModel?.city
    )

    customer.changeAddress(address);
    return customer
  }

  async findAll(): Promise<Customer[]> {
    const customerModel = await CustomerModel.findAll()

    const customers: Customer[] = []

    customerModel.forEach(customer => {
      const userAddress = new Address(customer.street, customer.number, customer.zipcode, customer.city);
      const customerInfo = new Customer(customer.id, customer.name);
      customerInfo.addRewardPoints(customer.rewardPoints);
      customerInfo.changeAddress(userAddress);

      if (customer.active) {
        customerInfo.activate()
      }

      customers.push(customerInfo)
    })

    return customers
  }
}
