import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
    tableName: 'invoice-item',
    timestamps: false
})
export class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    price: number;

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;

    @ForeignKey(() => InvoiceModel)
    @Column
    invoiceId: number;

    @BelongsTo(() => InvoiceModel)
    invoice: InvoiceModel;
}