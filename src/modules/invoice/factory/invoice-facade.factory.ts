import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {

  static create() {
    let repository = new InvoiceRepository();
    let generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    let findInvoiceUseCase = new FindInvoiceUseCase(repository);
    let invoiceFacade = new InvoiceFacade(generateInvoiceUseCase, findInvoiceUseCase);
    return invoiceFacade;
  }
}
