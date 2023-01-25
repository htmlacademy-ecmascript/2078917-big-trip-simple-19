import PointView from './point-view';
import View from './view';

export default class ListView extends View {

  /**
   * @param {PointViewState[]} states
   */
  setItems(states) {
    const views = states.map((x) => new PointView(x));

    this.replaceChildren(...views);
  }
}

customElements.define(String(ListView), ListView);
