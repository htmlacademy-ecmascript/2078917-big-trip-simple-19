import {FilterType} from '../enums';
import {filterCallbackMap, filterTitleMap} from '../maps';
import {findKey} from '../utils';
import Presenter from './presenter';

/**
 * @extends {Presenter<FilterView>}
 * Представление для списка фильтров
 */
export default class FilterPresenter extends Presenter {

  constructor() {
    super(...arguments);

    /**
     * @type {OptionViewState[]}
     */
    const options = Object.entries(filterTitleMap).map(([value, title]) => ({title, value}));

    this.view.setOptions(options);
    this.updateViewValue();
    this.view.addEventListener('change', this.handleViewChange.bind(this));
    this.pointsModel.addEventListener('add', this.handlePointsModelAdd.bind(this));
    this.pointsModel.addEventListener('update', this.handlePointsModelUpdate.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointsModelDelete.bind(this));

    this.updateViewDisability();
  }

  /**
   * Получить и установить активность текущего фильтра
   */
  updateViewValue() {
    const filter = this.pointsModel.getFilter();
    const filterType = findKey(filterCallbackMap, filter);
    this.view.setValue(filterType);
  }

  updateViewDisability() {
    const filters = Object.values(filterCallbackMap);
    const flags = filters.map((callbackFilter) => !this.pointsModel.list(callbackFilter).length);
    this.view.setDisability(flags);
  }

  /**
   * @override
   */
  handleNavigation() {
    if (this.location.pathname === '/new') {
      this.pointsModel.setFilter(filterCallbackMap[FilterType.EVERYTHING]);

      this.updateViewValue();
    }
  }

  handleViewChange() {
    const filterType = this.view.getValue();

    this.navigate('/');
    this.pointsModel.setFilter(filterCallbackMap[filterType]);

  }

  handlePointsModelAdd() {
    this.updateViewDisability();
  }

  handlePointsModelUpdate() {
    this.updateViewDisability();
  }

  handlePointsModelDelete() {
    this.updateViewDisability();
  }
}
