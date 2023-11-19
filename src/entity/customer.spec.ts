import Address from "./address"
import Customer from "./customer"
import { v4 as uuid } from "uuid"

describe("customer unit tests", () => {
  test("throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John")
    }).toThrow("Id is required")
  })

  test("throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "")
    }).toThrow("Name is required")
  })

  test("throw error when name is empty while changing name", () => {
    const customer = new Customer("123", "John");
    expect(customer.name).toBe("John")
    expect(() => {
      customer.changeName("")
    }).toThrow("Name is required")
  })

  test("should activate customer", () => {
    const customer = new Customer("123", "John");
    customer.Address = new Address("street", "1", "12346", "city");

    customer.activate();
    expect(customer.isActive()).toBe(true)
  })

  test("should not activate customer a when it does not have an address", () => {
    const customer = new Customer("123", "John");
    expect(() => customer.activate()).toThrow("address is mandatory to activate a customer")
  })

  test("should dactivate customer", () => {
    const customer = new Customer("123", "John");
    customer.Address = new Address("street", "1", "12346", "city");
    const activateSpy = jest.spyOn(customer, "activate");
    const deactivateSpy = jest.spyOn(customer, "deactivate");

    customer.activate();
    expect(customer.isActive()).toBe(true)

    customer.deactivate();
    expect(customer.isActive()).toBe(false)

    expect(activateSpy).toHaveBeenCalled()
    expect(deactivateSpy).toHaveBeenCalled()
  })

  test("should add reward points", () => {
    const customer = new Customer(uuid(), "John")
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(20)
    expect(customer.rewardPoints).toBe(30)
  })
})