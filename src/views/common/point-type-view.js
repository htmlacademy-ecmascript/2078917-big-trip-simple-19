import {pointIconMap} from '../../maps';
import {html} from '../../utils';
import RadioGroupView from '../radio-group-view';
import './point-type-view.css';

export default class PointTypeView extends RadioGroupView {
  constructor() {
    super();

    this.classList.add('event__type-wrapper');

    this.addEventListener('change', this.handleChange);
    this.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('blur', this.handleBlur, true);
    this.addEventListener('pointerup', this.handlePointerup);
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1" tabindex="-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
        </fieldset>
      </div>
    `;
  }

  /**
   * @override
   * @param {string} value
   */
  setValue(value) {
    super.setValue(value);

    if (pointIconMap[value]) {
      /**
       * @type {HTMLImageElement}
       */
      (this.querySelector('.event__type-icon')).src = pointIconMap[value];
    }
  }

  /**
   * Возвращает html-разметку типов точек маршрута по переданным параметрам
   * @param {OptionViewState} state
   */
  createOptionHtml(state) {
    return html`
      <div class="event__type-item">
        <input
          id="event-type-${state.value}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${state.value}"
          >
        <label
          class="event__type-label  event__type-label--${state.value}"
          for="event-type-${state.value}-1" tabindex="-1">${state.title}</label>
      </div>
    `;
  }

  /**
   * @param {OptionViewState[]} states Массив с информацией о типах точек маршрута
   */
  setOptions(states) {
    const optionsHtml = states.map(this.createOptionHtml).join('');

    this.querySelector('fieldset').insertAdjacentHTML('beforeend', optionsHtml);
  }

  open() {

    /**
     * @type {HTMLInputElement}
     */
    (this.querySelector('.event__type-toggle')).checked = true;

    /**
     * @type {HTMLInputElement}
     */
    (this.querySelector('.event__type-input:checked')).focus();
  }

  close() {

    /**
     * @type {HTMLInputElement}
     */
    (this.querySelector('.event__type-toggle')).checked = false;
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  handleChange(event) {
    if (event.target.type === 'checkbox') {
      return event.stopImmediatePropagation();
    }
    this.setValue(event.target.value);
  }

  /**
   * @param {FocusEvent & {relatedTarget: Element}} event
   */
  handleBlur(event) {
    if (!this.contains(event.relatedTarget)) {
      this.close();
    }
  }

  /**
   * @param {PointerEvent & {target: Element}} event
   */
  handlePointerup(event) {
    if (event.target.closest('.event__type-item')) {
      this.close();
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    if (event.key === 'Escape' && this.querySelector('.event__type-toggle:checked')) {
      event.stopPropagation();
      this.close();
    }
    else if (event.key === ' ') {
      this.open();
    }
  }
}

customElements.define(String(PointTypeView), PointTypeView);
