import {deleteButtonTextMap} from '../maps';
import {html} from '../utils';
import NewPointEditorView from './new-point-editor-view';

export default class PointEditorView extends NewPointEditorView {
  constructor() {
    super(...arguments);

    this.pointView = null;

    this.awaitDelete(false);
    this.querySelector('header').insertAdjacentHTML('beforeend', this.createCloseButtonHtml());
    this.addEventListener('click', this.handleClick);
  }

  /**
   * @override
   */
  open() {
    super.open();

    this.pointView = this.listView.findById(this.dataset.id);
    this.pointView.replaceWith(this);
  }

  /**
   * @override
   */
  close() {
    this.replaceWith(this.pointView);
    this.pointView?.fadeInLeft();
    this.pointView = null;

    super.close(...arguments);
  }

  createCloseButtonHtml() {
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>
    `;
  }

  /**
   * @param {boolean} flag
   */
  awaitDelete(flag) {
    const text = deleteButtonTextMap[Number(flag)];

    this.querySelector('.event__reset-btn').textContent = text;

    this.UBlockerView.toggle(flag);
  }

  /**
   * @param {MouseEvent & {target: Element}} event
   */
  handleClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }

}

customElements.define(String(PointEditorView), PointEditorView);
