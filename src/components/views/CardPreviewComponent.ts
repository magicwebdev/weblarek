import { ensureElement, getElementData } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';
import { CardComponent } from './CardComponent';
import { TCardPreview } from '../../types';

export class CardPreviewComponent extends CardComponent<TCardPreview> {
  protected cardCategoryElement: HTMLElement;
  protected cardImageElement: HTMLImageElement;
  protected cardDescriptionElement: HTMLElement;
  protected cardButtonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected onCardClick: (data: { id: string }) => void,
  ) {
    super(container);

    this.cardCategoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardImageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.cardDescriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.cardButtonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.cardButtonElement.addEventListener('click', () => {
      const data = getElementData<TCardPreview>(this.container, { id: String });
      if (data.id) {
        this.onCardClick({ id: data.id });
      }
    });
  } 

  set image(value: string) {
    this.cardImageElement.src = `${CDN_URL}${value}`;
  }

  set description(value: string) {
    this.cardDescriptionElement.textContent = value;
  }

  render(data?: Partial<TCardPreview>): HTMLElement {
    Object.assign(this as object, data ?? {});
    const buttonText = data?.isUnavailable ? 'Недоступно' : data?.isInBasket ? 'Удалить из корзины' : 'Купить';
    this.cardButtonElement.textContent = buttonText;
    this.cardButtonElement.disabled = Boolean(data?.isUnavailable);
    return this.container;
  }
}
