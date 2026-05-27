import { IProduct } from '../../types';

export class Catalog {
  protected products: IProduct[];
  protected selectedProduct: IProduct | null;

  constructor() {
    this.products = [];
    this.selectedProduct = null;
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | null {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
