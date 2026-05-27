import { IBuyer } from '../../types';
import { TPayment } from '../../types';

export class Buyer {
  protected payment: TPayment;
  protected email: string;
  protected phone: string;
  protected address: string;

  constructor() {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clearBuyerData(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  validateBuyerData(): { payment?: string; email?: string; phone?: string; address?: string } {
    const errors: { payment?: string; email?: string; phone?: string; address?: string } = {};

    if (!this.payment || this.payment.trim() === '') {
      errors.payment = 'Способ оплаты не выбран';
    }

    if (!this.email || this.email.trim() === '') {
      errors.email = 'Email не может быть пустым';
    }

    if (!this.phone || this.phone.trim() === '') {
      errors.phone = 'Номер телефона не может быть пустым';
    }

    if (!this.address || this.address.trim() === '') {
      errors.address = 'Адрес доставки не может быть пустым';
    }

    return errors;
  }
}
