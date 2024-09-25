import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

describe("PlaceOrderUseCase unit test", function () {
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
    });
});