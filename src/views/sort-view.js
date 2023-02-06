import {html} from '../utils';
import './sort-view.css';
import RadioGroupView from './radio-group-view';

export default class SortView extends RadioGroupView {
  constructor() {
    super();

    this.classList.add('trip-sort');
  }

  /**
   * Возвращает html-разметку сортировки по переданным параметрам
   * @param {OptionViewState} state
   */
  createOptionHtml(state) {
    return html`
      <div class="trip-sort__item  trip-sort__item--${state.value}">
        <input
          id="sort-${state.value}"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="${state.value}">
        <label
          class="trip-sort__btn"
          for="sort-${state.value}">
          ${state.title}
        </label>
      </div>
    `;
  }

  /**
   * @param {OptionViewState[]} states Массив с информацией о фильтре
   */
  setOptions(states) {
    this.innerHTML = states.map(this.createOptionHtml).join('');
  }

}

customElements.define(String(SortView), SortView);
