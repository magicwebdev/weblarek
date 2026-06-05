import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Catalog {
  protected products: IProduct[];
  protected selectedProduct: IProduct | null;

  constructor(protected events: IEvents) {
    this.products = [];
    this.selectedProduct = null;
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit('catalog:change');
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
    this.events.emit('product:select');
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
