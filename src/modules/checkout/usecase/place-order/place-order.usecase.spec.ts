import CheckStockUseCase from "../../../product-adm/usecase/check-stock/check-stock.usecase";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

describe("PlaceOrderUseCase unit test", function () {

    describe("validateProducts method", function () {
        //@ts-expect-error - no params in constructor
        const placeOrderUserCase = new PlaceOrderUseCase();

        it("should throw error if no products are selected", async function () {
            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            };
            await expect(placeOrderUserCase["validateProducts"](input)).rejects.toThrow(
                "No products selected"
            );
        });

        it("should throw an error when product is out of stock", async function () {
            const mockProductFacade = {
                checkStock: jest.fn(({ productId }: { productId: string }) => Promise.resolve({
                    productId,
                    stock: productId === "1" ? 0 : 1
                }))
            };
            //@ts-expect-error - force set product facade
            placeOrderUserCase["_productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{ productId: "1" }]
            }

            await expect(placeOrderUserCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );

            input = {
                clientId: "0",
                products: [{ productId: "0" }, { productId: "1" }]
            };

            await expect(placeOrderUserCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

            input = {
                clientId: "0",
                products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }]
            };

            await expect(placeOrderUserCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
        });
    });

    describe("execute method", function () {
        it("should throw an error when client not found", async function () {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null)
            }
            //@ts-expect-error - no params in constructor
            const placeOrderUserCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrderUserCase["_clientFacade"] = mockClientFacade;
            const input: PlaceOrderInputDto = { clientId: "0", products: [] };
            await expect(placeOrderUserCase.execute(input)).rejects.toThrow(new Error("Client not found"));
        });

        it("shoud throw an error when products are not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            }
            //@ts-expect-error - no params in constructor
            const placeOrderUserCase = new PlaceOrderUseCase();
            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUserCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));

            //@ts-expect-error - force set clientFacade
            placeOrderUserCase["_clientFacade"] = mockClientFacade;
            const input: PlaceOrderInputDto = { clientId: "1", products: [] };
            await expect(placeOrderUserCase.execute(input)).rejects.toThrow(
                new Error("No products selected")
            );
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        });
    });
});