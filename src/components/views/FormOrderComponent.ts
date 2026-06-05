import { ensureElement } from '../../utils/utils';
import { FormComponent } from './FormComponent';
import { IEvents } from '../base/Events';
import { TFormOrder } from '../../types';

export class FormOrderComponent extends FormComponent<TFormOrder> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container, events);

    this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.cardButton.addEventListener('click', () => {
      this.events.emit('payment:change', { payment: 'card' });
      this.payment = 'card';
    });

    this.cashButton.addEventListener('click', () => {
      this.events.emit('payment:change', { payment: 'cash' });
      this.payment = 'cash';
    });

    this.addressInput.addEventListener('input', () => {
      this.events.emit('address:change', {
        address: this.addressInput.value,
      });
    });
  }

  set payment(value: string) {
    this.cardButton.classList.toggle('button_alt-active', value === 'card');
    this.cashButton.classList.toggle('button_alt-active', value === 'cash');
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}
