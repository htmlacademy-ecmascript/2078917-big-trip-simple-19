import View from './view';

export default class RadioGroupView extends View {

  /**
   * @param {string} value Имя фильтра
   */
  setValue(value) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector(`[value="${value}"]`);

    if (view) {
      view.checked = true;
    }
  }

  /**
   * @returns {string} Имя фильтра
   */
  getValue() {
    const view = this.querySelector('[type="radio"]:checked');

    if (view) {
      return view.getAttribute('value');
    }

    return '';
  }

  /**
   * Установить активность всем переключателям
   * @param {boolean[]} flags Булевый массив, где true - переключатель активен, false - не активен
   */
  setDisability(flags) {

    /**
     * @type {NodeListOf<HTMLInputElement>}
     */
    (this.querySelectorAll('[type="radio"]')).forEach((x, index) => {
      x.disabled = flags[index];
    });
  }
}

customElements.define(String(RadioGroupView), RadioGroupView);
