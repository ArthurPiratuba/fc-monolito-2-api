import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice-facade.factory";
import { FindInvoiceFacadeInputDTO, GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel,]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();
    const input: GenerateInvoiceFacadeInputDto = {
      name: "Arthur",
      document: "000.000.000-00",
      street: "Rua dos padres",
      number: "000",
      complement: "Casa",
      city: "Piratuba",
      state: "SC",
      zipcode: "89667000",
      items: [
        { id: "1", name: "Corda", price: 50 },
        { id: "2", name: "Martelo", price: 50 }
      ]
    };
    const output = await invoiceFacade.generateInvoice(input);
    const invoiceModel = await InvoiceModel.findOne({ where: { id: output.id }, include: [InvoiceItemModel] });
    expect(invoiceModel).toBeDefined();
    expect(invoiceModel.id).toBeDefined();
    expect(invoiceModel.name).toBe(input.name);
    expect(invoiceModel.document).toBe(input.document);
    expect(invoiceModel.street).toBe(input.street);
    expect(invoiceModel.complement).toBe(input.complement);
    expect(invoiceModel.city).toBe(input.city);
    expect(invoiceModel.state).toBe(input.state);
    expect(invoiceModel.zipcode).toBe(input.zipcode);
    expect(invoiceModel.items).toHaveLength(2);
  });

  it("should find an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();
    const input: GenerateInvoiceFacadeInputDto = {
      name: "Arthur",
      document: "000.000.000-00",
      street: "Rua dos padres",
      number: "000",
      complement: "Casa",
      city: "Piratuba",
      state: "SC",
      zipcode: "89667000",
      items: [
        { id: "1", name: "Corda", price: 50 },
        { id: "2", name: "Martelo", price: 50 }
      ]
    };
    const output = await invoiceFacade.generateInvoice(input);
    const findInput: FindInvoiceFacadeInputDTO = { id: output.id };
    const foundInvoice = await invoiceFacade.findInvoice(findInput);
    expect(foundInvoice).toBeDefined();
    expect(foundInvoice.id).toBe(output.id);
    expect(foundInvoice.name).toBe(input.name);
    expect(foundInvoice.document).toBe(input.document);
    expect(foundInvoice.address.street).toBe(input.street);
    expect(foundInvoice.address.complement).toBe(input.complement);
    expect(foundInvoice.address.city).toBe(input.city);
    expect(foundInvoice.address.state).toBe(input.state);
    expect(foundInvoice.address.zipcode).toBe(input.zipcode);
    expect(foundInvoice.items).toHaveLength(2);
    expect(foundInvoice.items[0].name).toBe("Corda");
    expect(foundInvoice.items[0].price).toBe(50);
    expect(foundInvoice.items[1].name).toBe("Martelo");
    expect(foundInvoice.items[1].price).toBe(50);
  });
});
