/**
 * @template Item - тип объекта для хранения
 */
export default class Store {
  #base;
  #auth;
  /**
   * @constructor
   * @param {string} base - основной URL
   * @param {string} auth - заголовок Authorization
   */
  constructor(base, auth) {
    this.#base = base;
    this.#auth = auth;
  }

  /**
   * GET-запрос к основному URL
   * @return {Promise<Item[]>} - массив точек маршрута (Point)
   */
  list() {
    return this.request('/', {
      'method': 'get'
    });
  }

  /**
   * POST-запрос на добавление точки маршрута
  * @param {Omit<Item, 'id'>} item - точка маршрута без ИД (LocalPoint)
  * @return {Promise<Item>} - точка маршрута (Point)
  */
  add(item) {
    return this.request('/', {
      'method': 'post',
      'body': JSON.stringify(item)
    });
  }

  /**
   * PUT-запрос на редактирование точки маршрута
   * @param {Item} item - точка маршрута
   * @return {Promise<Item>} - обновленная точка маршрута (Point)
   */
  update(item) {
    // @ts-ignore
    return this.request(`/${item.id}`, {
      method: 'put',
      body: JSON.stringify(item)
    });
  }

  /**
   * DELETE-запрос на удаление точки маршрута
   * @param {string} id - ИД точки маршрута
   * @return {Promise<string>} - текст "ОК"
   */
  delete(id) {
    return this.request(`/${id}`, {
      method: 'delete'
    });
  }

  /**
   *
   * @param {string} path - дополнительный путь к основному
   * @param {RequestInit} options
   */
  async request(path, options = {}) {
    const headers = {
      'content-type': 'application/json',
      'authorization': this.#auth,
      ...options.headers
    };

    const response = await fetch(this.#base + path, {...options, headers});
    const {assert, parse} = /** @type {typeof Store} */ (this.constructor);//TODO Почему нельзя использовать Store.assert, Store.parse ?

    await assert(response);
    return parse(response);
  }

  /**
   * Проверка успешности ответа от сервера
  * @param {Response} response - ответ от сервера
  */
  static async assert(response) {//TODO Зачем возвращать пустой промис?
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  }

  /**
   * Преобразование ответа в JSON или текст
   * @param {Response} response - ответ от сервера
   */
  static parse(response) {
    if (response.headers.get('content-type').startsWith('application/json')) {
      return response.json();
    }
    return response.text();
  }
}
