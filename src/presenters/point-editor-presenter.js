import NewPointEditorPresenter from './new-point-editor-presenter';

/**
 * @extends {NewPointEditorPresenter<PointEditorView>}
 */
export default class PointEditorPresenter extends NewPointEditorPresenter {

  /**
   * @override
   * @param {PointAdapter} point
   */
  async save(point) {
    point.id = this.view.dataset.id;
    await this.pointsModel.update(point);
  }

  /**
   * @override
   */
  handleNavigation() {
    this.view.close(false);

    if(this.location.pathname === '/edit') {
      const pointId = this.location.searchParams.get('id');
      const point = this.pointsModel.findById(pointId);

      if (!point) {
        throw new Error(`Cannot edit point ${pointId} (it does not exist)`);
      }
      this.view.dataset.id = pointId;
      this.view.open();
      this.updateView(point);
    }
  }

  /**
   * @override
   * @param {Event} event
   */
  async handleViewReset(event) {
    event.preventDefault();

    this.view.awaitDelete(true);

    try {
      await this.pointsModel.delete(this.view.dataset.id);

      this.view.close();
    }
    catch (exception) {
      this.view.shake();
    }

    this.view.awaitDelete(false);
  }
}
