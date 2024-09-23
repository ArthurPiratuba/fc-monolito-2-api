import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

  constructor(
    private addUseCase: UseCaseInterface,
    private stockUseCase: UseCaseInterface
  ) { }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this.addUseCase.execute(input);
  }

  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this.stockUseCase.execute(input);
  }

}
