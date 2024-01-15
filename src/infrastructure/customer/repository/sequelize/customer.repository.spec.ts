import { Sequelize } from "sequelize-typescript"
import CustomerModel from "./customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../../../domain/customer/value-object/address";


describe("Customer repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  })

  test("should create a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("rua", "numero", "zip", "city");
    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      city: customer.Address.city,
      number: customer.Address.number,
      street: customer.Address.street,
      zipcode: customer.Address.zip,
      rewardPoints: customer.rewardPoints,
    })
  })

  test("should update a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("rua", "numero", "zip", "city");
    customer.Address = address;

    customerRepository.create(customer);

    customer.changeName("NAME CHANGED");
    customerRepository.update(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      city: address.city,
      number: address.number,
      street: address.street,
      zipcode: address.zip,
    })
  })

  test("should find a customer by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("rua", "numero", "zip", "city");
    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } })
    const foundCustomer = await customerRepository.find("1")

    expect(customerModel?.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      active: foundCustomer.isActive(),
      rewardPoints: foundCustomer.rewardPoints,
      city: address.city,
      number: address.number,
      street: address.street,
      zipcode: address.zip,
    })
  })

  test("should find all", async () => {
    const address = new Address("rua", "numero", "zip", "city");
    const customer1 = new Customer("1", "Customer 1");
    const customer2 = new Customer("2", "Customer 2");
    customer1.addRewardPoints(5);
    customer2.addRewardPoints(10);
    customer1.deactivate();
    customer2.deactivate();
    customer1.Address = address;
    customer2.Address = address;

    const model1 = await CustomerModel.create({
      name: customer1.name,
      street: customer1.Address.street,
      number: customer1.Address.number,
      zipcode: customer1.Address.zip,
      city: customer1.Address.city,
      active: customer1.isActive(),
      rewardPoints: customer1.rewardPoints,
    })
    const model2 = await CustomerModel.create({
      name: customer2.name,
      street: customer2.Address.street,
      number: customer2.Address.number,
      zipcode: customer2.Address.zip,
      city: customer2.Address.city,
      active: customer2.isActive(),
      rewardPoints: customer2.rewardPoints,
    })

    const allCustomers = await new CustomerRepository().findAll()
    expect(allCustomers.length).toBe(2)

    expect(model1.toJSON()).toStrictEqual({
      id: allCustomers[0].id,
      name: allCustomers[0].name,
      active: allCustomers[0].isActive(),
      rewardPoints: allCustomers[0].rewardPoints,
      city: allCustomers[0].Address.city,
      number: allCustomers[0].Address.number,
      street: allCustomers[0].Address.street,
      zipcode: allCustomers[0].Address.zip,
    }
    )
    expect(model2.toJSON()).toStrictEqual({
      id: allCustomers[1].id,
      name: allCustomers[1].name,
      active: allCustomers[1].isActive(),
      rewardPoints: allCustomers[1].rewardPoints,
      city: allCustomers[1].Address.city,
      number: allCustomers[1].Address.number,
      street: allCustomers[1].Address.street,
      zipcode: allCustomers[1].Address.zip,
    })
  })

  test("should throw an error when a customer cannot be found", () => {
    const customerRepositoty = new CustomerRepository();
    expect(async () => customerRepositoty.find("XYZ123"))
      .rejects
      .toThrow(new Error("customer not found"))
  })
})