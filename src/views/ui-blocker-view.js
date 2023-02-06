import View from './view';
import {html} from '../utils';
import './ui-blocker-view.css';

/**
 * @implements {EventListenerObject}
 */
export default class UiBlockerView extends View {
  constructor() {
    super();

    this.classList.add('ui-blocker');
  }

  /**
   * @override
   */
  createHtml() {
    return html`

    `;
  }

  /**
   * Переключатель
   * @param {boolean} flag True - показать
   */
  toggle(flag) {
    if (flag) {
      document.body.append(this);
      document.addEventListener('keydown', this);
    }
    else {
      this.remove();
      document.removeEventListener('keydown', this);
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    event.preventDefault();
  }
}

customElements.define(String(UiBlockerView), UiBlockerView);
