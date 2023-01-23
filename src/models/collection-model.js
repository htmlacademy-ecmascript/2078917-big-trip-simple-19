import Model from './model';

/**
 * Модель для взаимодействия с хранилищем
 * @template Item - тип объекта в хранилище
 * @template {Adapter} ItemAdapter - адаптер наследуемый от Store
 */
export default class CollectionModel extends Model {
  #store;
  #adapt;
  #filter;
  #sort;

  /**
  * @type {Item[]}
  */
  #items;

  /**
   * @param {Object} setup
   * @param {Store<Item>} setup.store
   * @param {FilterCallback<ItemAdapter>} [setup.filter]
   * @param {SortCallback<ItemAdapter>} [setup.sort]
   * @param {AdaptCallback<Item,ItemAdapter>} setup.adapt
   */
  constructor(setup) {
    super();

    this.#store = setup.store;
    this.#adapt = setup.adapt;
    this.#filter = setup.filter;
    this.#sort = setup.sort;
  }

  /**
   * Получение коллекции объектов из сервера, запись в локальную коллекцию
   * @override
   */
  async ready() {
    this.#items = await this.#store.list();
  }

  /**
   * Запонмить фильтр, вызвать событие "filter"
  * @param {FilterCallback<ItemAdapter>} filter - callback-функция для фильтрации
  */
  setFilter(filter, notify = true) {
    this.#filter = filter;
    if (notify) {
      this.dispatchEvent(new CustomEvent('filter'));
    }
  }

  getFilter() {
    return this.#filter;
  }

  /**
   * Запонмить сортировку, вызвать событие "sort"
  * @param {SortCallback<ItemAdapter>} sort - callback-функция для сортировки
  */
  setSort(sort, notify = true) {
    this.#sort = sort;
    if (notify) {
      this.dispatchEvent(new CustomEvent('sort'));
    }
  }

  getSort() {
    return this.#sort;
  }

  /**
   *
   * @param {FilterCallback<ItemAdapter>} filter - callback-функция для фильрации, задана по умолчанию
   * @param {SortCallback<ItemAdapter>} sort - callback-функция для сортировки, задана по умолчанию
   * @returns ItemAdapter[] - отсортированный, отфильтрованный, адаптированный локальная коллекция
   */
  list(
    filter = this.getFilter(),
    sort = this.getSort()
  ) {
    return this.listAll().filter(filter).sort(sort);
  }

  /**
   * Получить все обекты локальной коллекции
   * @returns адаптированная локальная коллекция
   */
  listAll() {
    return this.#items.map(this.#adapt);
  }

  /**
   * Получить объект по ИД локальной коллекции
  * @param {number} [index] - индекс локальной коллекции
  * @returns {ItemAdapter} - адаптированный объект из локальной коллекции
  */
  item(index) {
    if (arguments.length) {
      const item = this.#items[index];
      return item && this.#adapt(item);
    }
    return this.#adapt();
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  findBy(key, value) {
    return this.listAll().find((x) => x[key] === value);
  }

  /**
 * @param {string} id
 */
  findById(id) {
    return this.findBy('id', id);
  }

  /**
  * @param {string} key
  * @param {*} value
  */
  findIndexBy(key, value) {
    return this.listAll().findIndex((x) => x[key] === value);
  }

  /**
  * @param {string} id
  */
  findIndexById(id) {
    return this.findIndexBy('id', id);
  }

  /**
   * @param {ItemAdapter} item
   */
  async add(item) {
    const newItem = await this.#store.add(item.toJSON());
    const detail = this.#adapt(newItem);

    this.#items.push(newItem);
    this.dispatchEvent(new CustomEvent('add', {detail}));

    return detail;
  }

  /**
  * @param {ItemAdapter} item
  */
  async update(item) {
    const newItem = await this.#store.update(item.toJSON());
    const index = this.findIndexById(item.id);
    const detail = {
      'oldItem': this.item(index),
      'newItem': this.#adapt(newItem)
    };

    this.#items.splice(index, 1, newItem);
    this.dispatchEvent(new CustomEvent('update', {detail}));

    return detail;
  }

  /**
  * @param {string} id
  */
  async delete(id) {
    await this.#store.delete(id);

    const index = this.findIndexById(id);
    const detail = this.item(index);

    this.#items.splice(index, 1);
    this.dispatchEvent( new CustomEvent('delete', {detail}));

    return detail;
  }

}
