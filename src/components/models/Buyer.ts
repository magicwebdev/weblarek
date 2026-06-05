import { IBuyer, TPayment, TBuyerErrors } from '../../types';
import { IEvents } from '../base/Events';

export class Buyer {
  protected payment: TPayment;
  protected email: string;
  protected phone: string;
  protected address: string;

  constructor(protected events: IEvents) {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit('buyer:change');
  }

  setEmail(email: string): void {
    this.email = email;
    this.events.emit('buyer:change');
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit('buyer:change');
  }

  setAddress(address: string): void {
    this.address = address;
    this.events.emit('buyer:change');
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
    this.events.emit('buyer:change');
  }

  validateBuyerData(): TBuyerErrors {
    const errors: TBuyerErrors = {};

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
