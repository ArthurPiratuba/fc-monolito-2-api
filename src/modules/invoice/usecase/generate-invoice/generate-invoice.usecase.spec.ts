import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.dto";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate invoice usecase unit test", () => {
  it("should add a product", async () => {
    const repository = MockRepository();
    const generateInvoice = new GenerateInvoiceUseCase(repository);
    const input: GenerateInvoiceUseCaseInputDto = {
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
    const output = await generateInvoice.execute(input);
    expect(repository.add).toHaveBeenCalled();
    expect(output.id).toBeDefined;
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.complement).toBe(input.complement);
    expect(output.city).toBe(input.city);
    expect(output.state).toBe(input.state);
    expect(output.zipcode).toBe(input.zipcode);
    expect(output.name).toBe(input.name);
    expect(output.items).toHaveLength(2);
    expect(output.total).toBe(100);
  });
});
