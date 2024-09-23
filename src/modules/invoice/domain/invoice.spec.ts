import Address from "../../@shared/domain/value-object/address";
import Invoice from "./invoice.entity";

test("Must get the invoive total", function () {
    let invoice = new Invoice({
        name: "Arthur",
        document: "",
        address: new Address("", "", "", "", "", ""),
    });
    invoice.addItem("Porcelanato", 15000);
    invoice.addItem("Refrigerante", 10);
    expect(invoice.getTotal()).toBe(15010);
});