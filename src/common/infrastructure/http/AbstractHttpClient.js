/**
 * @interface
 * @typedef {object} HttpClient
 * @property {function} request - Function to make a request.
 * @property {function} get - Function to make a GET request.
 * @property {function} post - Function to make a POST request.
 * @property {function} put - Function to make a PUT request.
 * @property {function} patch - Function to make a PATCH request.
 * @property {function} delete - Function to make a DELETE request.
 */
class AbstractHttpClient {
  /**
   * Sends an HTTP request.
   * @param {object} config - The request configuration.
   * @param {string} config.url - The URL of the request.
   * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} [config.method='GET'] - The HTTP method of the request.
   * @param {object} [config.headers={}] - The headers of the request.
   * @param {object} [config.params={}] - The query parameters of the request.
   * @param {object} [config.data={}] - The body of the request, used for 'POST', 'PUT' and 'PATCH' requests.
   * @param {number} [config.timeout=0] - The timeout for the request in milliseconds.
   * @returns {Promise<object>} - The response data.
   */
  async request(config) {}

  /**
   * Sends an HTTP GET request.
   * @param {string} url - The URL of the request.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  get(url, config = {}) {}

  /**
   * Sends an HTTP POST request.
   * @param {string} url - The URL of the request.
   * @param {object} [data={}] - The request data.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  post(url, data = {}, config = {}) {}

  /**
   * Sends an HTTP PUT request.
   * @param {string} url - The URL of the request.
   * @param {object} [data={}] - The request data.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  put(url, data = {}, config = {}) {}

  /**
   * Sends an HTTP PATCH request.
   * @param {string} url - The URL of the request.
   * @param {object} [data={}] - The request data.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  patch(url, data = {}, config = {}) {}

  /**
   * Sends an HTTP DELETE request.
   * @param {string} url - The URL of the request.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  delete(url, config = {}) {}
}

export default AbstractHttpClient;