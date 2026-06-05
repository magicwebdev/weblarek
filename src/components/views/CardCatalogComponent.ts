import { ensureElement, setCardCategory, setElementData, getElementData } from '../../utils/utils';
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

    this.container.addEventListener('click', () => {
      const data = getElementData<TCardCatalog>(this.container, { id: String });
      if (data.id) {
        this.events.emit('card:click', { id: data.id });
      }
    });
  }

  set id(value: string) {
    setElementData(this.container, { id: value });
  }

  set category(value: string) {
    setCardCategory(this.cardCategoryElement, value);
  }

  set image(value: string) {
    this.cardImageElement.src = `${CDN_URL}${value}`;
  }
}
