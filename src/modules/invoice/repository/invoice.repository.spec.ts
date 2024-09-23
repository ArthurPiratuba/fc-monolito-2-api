import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model"
import Invoice from "../domain/invoice.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/domain/value-object/address"
import InvoiceRepository from "./invoice.repository"
import InvoiceItem from "../domain/invoice-item.entity"
import { InvoiceItemModel } from "./invoice-item.model"

describe("Invoice Repository test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceItemModel, InvoiceModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a invoice", async () => {

    const invoice = new Invoice({
      id: new Id("1"),
      name: "Arthur",
      document: "1234-5678",
      address: new Address(
        "Rua 123",
        "99",
        "Casa Amarela",
        "Piratuba",
        "SC",
        "88888-888"
      ),
      items: [
        new InvoiceItem({ name: "Tapete", price: 100 }),
        new InvoiceItem({ name: "Ração", price: 200 })
      ]
    })

    const repository = new InvoiceRepository()
    await repository.add(invoice)

    const clientDb = await InvoiceModel.findOne({ where: { id: "1" } })

    expect(clientDb).toBeDefined()
    expect(clientDb.id).toEqual(invoice.id.id)
    expect(clientDb.name).toEqual(invoice.name)
    expect(clientDb.document).toEqual(invoice.document)
    expect(clientDb.street).toEqual(invoice.address.street)
    expect(clientDb.number).toEqual(invoice.address.number)
    expect(clientDb.complement).toEqual(invoice.address.complement)
    expect(clientDb.city).toEqual(invoice.address.city)
    expect(clientDb.state).toEqual(invoice.address.state)
    expect(clientDb.zipcode).toEqual(invoice.address.zipcode)
    expect(clientDb.createdAt).toStrictEqual(invoice.createdAt)
    expect(clientDb.updatedAt).toStrictEqual(invoice.updatedAt)
  })

  it("should find a invoice", async () => {

    const invoice = await InvoiceModel.create({
      id: '1',
      name: 'Arthur',
      email: 'arthur@123.com',
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Amarela",
      city: "Piratuba",
      state: "SC",
      zipcode: "88888-888",
      items: [
        { name: "Tapete", price: 100 },
        { name: "Ração", price: 200 }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const repository = new InvoiceRepository()
    const result = await repository.find(invoice.id)

    expect(result.id.id).toEqual(invoice.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.number).toEqual(invoice.number)
    expect(result.address.complement).toEqual(invoice.complement)
    expect(result.address.city).toEqual(invoice.city)
    expect(result.address.state).toEqual(invoice.state)
    expect(result.address.zipcode).toEqual(invoice.zipcode)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
  })
})