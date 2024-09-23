import Address from "../../../@shared/domain/value-object/address";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUseCase {

    constructor(private repository: InvoiceGateway) { }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this.repository.find(input.id);
        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: new Address(
                invoice.address.street,
                invoice.address.number,
                invoice.address.complement,
                invoice.address.city,
                invoice.address.state,
                invoice.address.zipcode,
            ),
            items: invoice.items.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            }),
            total: invoice.getTotal(),
            createdAt: invoice.createdAt
        }
    }
}