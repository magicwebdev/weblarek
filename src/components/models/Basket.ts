import { IProduct } from '../../types';

export class Basket {
  protected selectedProducts: IProduct[];

  constructor() {
    this.selectedProducts = [];
  }

  getSelectedProducts(): IProduct[] {
    return this.selectedProducts;
  }

  addProduct(product: IProduct): void {
    this.selectedProducts.push(product);
  }

  deleteProduct(product: IProduct): void {
    const index = this.selectedProducts.findIndex((selectedProduct) => selectedProduct.id === product.id);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }
  }

  clearBasket(): void {
    this.selectedProducts = [];
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
