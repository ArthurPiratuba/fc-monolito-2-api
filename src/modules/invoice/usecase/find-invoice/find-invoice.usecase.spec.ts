import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import { FindInvoiceUseCaseInputDTO } from "./find-invoice.dto";
import FindInvoiceUseCase from "./find-invoice.usecase";

let invoice = new Invoice({
  id: new Id("0001"),
  name: "Arthur",
  document: "",
  address: new Address("Rua dos padres", "", "casa", "Piratuba", "SC", "89667000"),
});
invoice.addItem("Porcelanato", 15000);
invoice.addItem("Refrigerante", 10);

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Generate invoice usecase unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const findInvoice = new FindInvoiceUseCase(repository);
    const input: FindInvoiceUseCaseInputDTO = { id: "0001" };
    const output = await findInvoice.execute(input);
    expect(repository.find).toHaveBeenCalled();
    expect(output.id).toBeDefined;
    expect(output.name).toBe(invoice.name);
    expect(output.document).toBe(invoice.document);
    expect(output.address.street).toBe(invoice.address.street);
    expect(output.address.complement).toBe(invoice.address.complement);
    expect(output.address.city).toBe(invoice.address.city);
    expect(output.address.state).toBe(invoice.address.state);
    expect(output.address.zipcode).toBe(invoice.address.zipcode);
    expect(output.name).toBe(invoice.name);
    expect(output.items).toHaveLength(2);
    expect(output.total).toBe(15010);
  });
});
