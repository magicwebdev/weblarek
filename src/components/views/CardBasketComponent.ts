import { ensureElement } from '../../utils/utils';
import { CardComponent } from './CardComponent';
import { TCardBasket, TCardActions } from '../../types';

export class CardBasketComponent extends CardComponent<TCardBasket> {
  protected cardIndexElement: HTMLElement;
  protected cardDeleteButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    actions: TCardActions,
  ) {
    super(container);

    this.cardIndexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.cardDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    this.cardDeleteButton.addEventListener('click', actions.onClick);
  }

  set index(value: number) {
    this.cardIndexElement.textContent = String(value);
  }
}
