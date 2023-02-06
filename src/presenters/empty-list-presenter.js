import {emptyListTitleMap, filterCallbackMap} from '../maps';
import {findKey} from '../utils';
import Presenter from './presenter';

/**
 * @extends {Presenter<HTMLParagraphElement>}
 */
export default class EmptyListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.pointsModel.addEventListener('add', this.handlePointsModelAdd.bind(this));
    this.pointsModel.addEventListener('update', this.handlePointsModelUpdate.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointsModelDelete.bind(this));
    this.pointsModel.addEventListener('filter', this.handlePointsModelFilter.bind(this));

  }

  updateView() {
    const points = this.pointsModel.list();
    const filter = this.pointsModel.getFilter();
    const filterType = findKey(filterCallbackMap, filter);

    this.view.hidden = this.location.pathname === '/new' || Boolean(points.length);
    this.view.textContent = emptyListTitleMap[filterType];
  }

  /**
   * @override
   */
  handleNavigation() {
    this.updateView();
  }

  handlePointsModelAdd() {
    this.updateView();
  }

  handlePointsModelUpdate() {
    this.updateView();
  }

  handlePointsModelDelete() {
    this.updateView();
  }

  handlePointsModelFilter() {
    this.updateView();
  }
}
