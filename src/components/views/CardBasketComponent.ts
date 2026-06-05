import { ensureElement } from '../../utils/utils';
import { CardComponent } from './CardComponent';
import { IEvents } from '../base/Events';
import { TCardBasket } from '../../types';

export class CardBasketComponent extends CardComponent<TCardBasket> {
  protected cardIndexElement: HTMLElement;
  protected cardDeleteButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.cardIndexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.cardDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    
    this.cardDeleteButton.addEventListener('click', () => {
      this.events.emit('basket:remove', { id: this.container.id });
    });
  }

  set index(value: number) {
    this.cardIndexElement.textContent = String(value);
  }
  
  remove() {
    this.container.remove();
  }
}
