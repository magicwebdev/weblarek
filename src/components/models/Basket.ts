import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Basket {
  protected selectedProducts: IProduct[];

  constructor(protected events: IEvents) {
    this.selectedProducts = [];
  }

  getSelectedProducts(): IProduct[] {
    return this.selectedProducts;
  }

  addProduct(product: IProduct): void {
    this.selectedProducts.push(product);
    this.events.emit('basket:change');
  }

  deleteProduct(product: IProduct): void {
    const index = this.selectedProducts.findIndex((selectedProduct) => selectedProduct.id === product.id);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
      this.events.emit('basket:change');
    }
  }

  clearBasket(): void {
    this.selectedProducts = [];
    this.events.emit('basket:change');
  }

  getTotalPrice(): number {
    return this.selectedProducts.reduce((total, product) => total + (product.price ?? 0), 0);
  }

  getProductsCount(): number {
    return this.selectedProducts.length;
  }

  hasProductInBasket(id: string): boolean {
    return this.selectedProducts.some((product) => product.id === id);
  }
}
