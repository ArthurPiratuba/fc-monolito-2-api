import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object"
import InvoiceItem from "../domain/invoice-item.entity"
import Invoice from "../domain/invoice.entity"
import InvoiceGateway from "../gateway/invoice.gateway"
import { InvoiceItemModel } from "./invoice-item.model"
import { InvoiceModel } from "./invoice.model"

export default class InvoiceRepository implements InvoiceGateway {

  async add(entity: Invoice): Promise<void> {

    await InvoiceModel.create({
      id: entity.id.id,
      name: entity.name,
      document: entity.document,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zipcode,
      items: entity.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }, {
      include: [InvoiceItemModel]
    })
  }

  async find(id: string): Promise<Invoice> {
    const model = await InvoiceModel.findOne({ where: { id }, include: [InvoiceItemModel] });
    if (!model) {
      throw new Error("model not found");
    }
    let items: InvoiceItem[] = [];
    for (let item of model.items) {
      items.push(new InvoiceItem({
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        id: new Id(item.id)
      }));
    }
    return new Invoice({
      id: new Id(model.id),
      name: model.name,
      document: model.document,
      address: new Address(
        model.street,
        model.number,
        model.complement,
        model.city,
        model.state,
        model.zipcode,
      ),
      createdAt: model.createdAt,
      updatedAt: model.createdAt,
      items
    })
  }
}