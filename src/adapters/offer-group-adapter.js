import Adapter from './adapter';

export default class PointAdapter extends Adapter {
  /**
   * @param {OfferGroup} data
   */
  constructor(data) {
    super();

    this.id = data.type;
    this.items = data.offers.map((x) => ({
      ...x,
      id: String(x.id)
    }));
  }
}
