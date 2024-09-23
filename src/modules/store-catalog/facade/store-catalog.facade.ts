import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.interface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

  constructor(
    private findProduct: FindProductUseCase,
    private findAllProducts: FindAllProductsUsecase
  ) { }

  async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this.findProduct.execute(id);
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this.findAllProducts.execute();
  }
}
