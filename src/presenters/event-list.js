import TripEventListView from '../view/trip-event-list.js';
import TripEventView from '../view/trip-event.js';
import EditTripEventView from '../view/edit-trip-event.js';
import {render} from '../render.js';

export default class EventListPresenter {
  eventListComponent = new TripEventListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.eventListComponent, this.listContainer);
    render(new EditTripEventView(), this.eventListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new TripEventView(), this.eventListComponent.getElement());
    }
  }
}
