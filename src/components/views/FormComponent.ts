import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IForm } from '../../types';

export abstract class FormComponent<T extends IForm> extends Component<T> {
  protected formElement: HTMLFormElement;
  protected errorsElement: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container);

    this.formElement = this.container as HTMLFormElement;
    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
    this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);

    this.submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.events.emit(`${this.formElement.name}:submit`, {});
    });
  }

  set isValid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
}
