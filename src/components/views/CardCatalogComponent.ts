import { ensureElement, setCardCategory } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';
import { CardComponent } from './CardComponent';
import { IEvents } from '../base/Events';
import { TCardCatalog } from '../../types';

export class CardCatalogComponent extends CardComponent<TCardCatalog> {
  protected cardCategoryElement: HTMLElement;
  protected cardImageElement: HTMLImageElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.cardCategoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardImageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
  }

  set category(value: string) {
    setCardCategory(this.cardCategoryElement, value);
  }

  set image(value: string) {
    this.cardImageElement.src = `${CDN_URL}${value}`;
  }
}
