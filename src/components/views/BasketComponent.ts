import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IBasket } from '../../types';

export class BasketComponent extends Component<IBasket> {
  protected listElement: HTMLElement;
  protected priceElements: HTMLElement;
  protected orderButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.listElement = ensureElement<HTMLInputElement>('.basket__list', this.container);
    this.priceElements = ensureElement<HTMLInputElement>('.basket__price', this.container);
    this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

    this.orderButton.addEventListener('click', () => {
      this.events.emit('basket:order', {});
    });
  }

  set content(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);
  }

  set total(value: number) {
    this.priceElements.textContent = `${value} синапсов`;
  }
}
