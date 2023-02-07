import PointView from './point-view';
import View from './view';

export default class ListView extends View {

  /**
   * @param {PointViewState[]} states
   */
  setItems(states) {
    const views = states.map((view) => new PointView(view));

    this.replaceChildren(...views);

    return views;
  }

  /**
   * @param {string} id
   * @returns {PointView}
   */
  findById(id) {
    return this.querySelector(`${PointView}[data-id="${id}"]`);
  }
}

customElements.define(String(ListView), ListView);
