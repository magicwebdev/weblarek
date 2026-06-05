import { ensureElement, setElementData } from '../../utils/utils';
import { Component } from '../base/Component';
import { TCard } from '../../types';

export abstract class CardComponent<T extends TCard> extends Component<T> {
  protected cardTitleElement: HTMLElement;
  protected cardPriceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardTitleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.cardPriceElement = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set id(value: string) {
    setElementData(this.container, { id: value });
  }

  set title(value: string) {
    this.cardTitleElement.textContent = value;
  }

  set price(value: number | null) {
    this.cardPriceElement.textContent = value === null ? `Бесценно` : `${value} синапсов`;
  }
}
