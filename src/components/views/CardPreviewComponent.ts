import { ensureElement, setCardCategory } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';
import { CardComponent } from './CardComponent';
import { IEvents } from '../base/Events';
import { TCardPreview } from '../../types';

export class CardPreviewComponent extends CardComponent<TCardPreview> {
  protected cardCategoryElement: HTMLElement;
  protected cardImageElement: HTMLImageElement;
  protected cardDescriptionElement: HTMLElement;
  protected cardButtonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.cardCategoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardImageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.cardDescriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.cardButtonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.cardButtonElement.addEventListener('click', () => {
      this.events.emit('basket:change', { id: this.container.id });
    });
  }

  set category(value: string) {
    setCardCategory(this.cardCategoryElement, value);
  }

  set image(value: string) {
    this.cardImageElement.src = `${CDN_URL}${value}`;
  }

  set description(value: string) {
    this.cardDescriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.cardButtonElement.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this.cardButtonElement.disabled = value;
  }
  
  set inBasket(value: boolean) {
    this.buttonText = value ? 'Недоступно' : 'Купить';
  }
}