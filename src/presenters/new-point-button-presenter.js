import Presenter from './presenter';

/**
 * @extends {Presenter<HTMLButtonElement>}
 */
export default class NewPointButtonPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.view.addEventListener('click', this.handleNewPointButtonClick.bind(this));
  }

  /**
   * @override
   */
  handleNavigation() {
    this.view.disabled = this.location.pathname === '/new';
  }

  handleNewPointButtonClick() {
    this.navigate('/new');
  }
}
