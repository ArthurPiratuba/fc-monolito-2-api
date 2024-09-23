import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {

  constructor(
    private generateInvoiceUseCase: GenerateInvoiceUseCase,
    private findInvoiceUseCase: FindInvoiceUseCase
  ) { }

  async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this.generateInvoiceUseCase.execute(input);
  }

  async findInvoice(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return await this.findInvoiceUseCase.execute(input);
  }

}