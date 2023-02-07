import View from '../view';
import {html} from '../../utils';

export default class DestinationView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group', 'event__field-group--destination');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <label class="event__label  event__type-output" for="event-destination-1"></label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="destination"
        list="destination-list-1">
      <datalist id="destination-list-1"></datalist>
    `;
  }

  /**
   * Возвращает html-разметку пункта назначения
   * @param {OptionViewState} state
   */
  createOptionHtml(state) {
    return html`
      <option value=${state.value}>${state.title}</option>
    `;
  }

  /**
   * Создает список пунктов назначений и записывает в элемент destination-view
   * @param {OptionViewState[]} states Пункты назначения
   */
  setOptions(states) {
    const optionsHtml = states.map(this.createOptionHtml).join('');

    this.querySelector('datalist').innerHTML = optionsHtml;
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    this.querySelector('input').value = value;
  }

  getValue() {
    return this.querySelector('input').value;
  }

  /**
   * @param {string} value
   */
  setLabel(value) {
    this.querySelector('label').textContent = value;
  }

}

customElements.define(String(DestinationView), DestinationView);
