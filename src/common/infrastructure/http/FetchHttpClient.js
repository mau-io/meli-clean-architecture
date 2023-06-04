import HttpTimeoutError from '#src/common/infrastructure/errors/HttpTimeoutError.js';
import AbstractHttpClient from '#src/common/infrastructure/http/AbstractHttpClient.js';

// Crear una nueva clase de error que incluya el código de estado HTTP
class HttpError extends Error {
  constructor(message, response) {
    super(message);
    this.response  = response;
  }
}

/**
 * Represents an HTTP client for making requests.
 * @class
 */
class FetchHttpClient extends AbstractHttpClient {
  /**
   * Creates a new FetchHttpClient instance.
   * @param {string} baseURL - The base URL of the API.
   */
  constructor(baseURL = '') {
    super();
    this.baseURL = baseURL;
  }

  async request(config) {
    const {
      timeout = 5000,
      params = {},
      ...requestConfig
    } = config;

    const controller = new AbortController();
    const { signal } = controller;

    const timeoutId = timeout > 0
      ? setTimeout(() => {
        controller.abort();
      }, timeout)
      : null;

    const requestUrl = new URL(`${this.baseURL}${requestConfig.url}`);

    // Add query parameters
    Object.keys(params)
      .forEach(key => requestUrl
        .searchParams
        .append(key, params[key])
      );

    const requestOptions = {
      method: requestConfig.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...requestConfig.headers,
      },
      body: JSON.stringify(requestConfig.data),
      signal,
    };

    let response;
    try {
      response = await fetch(requestUrl, requestOptions);
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new HttpTimeoutError();
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }

    const responseData = await response.json();

    const headers = {};
    if(response.headers) {
      for (let [key, value] of response.headers.entries()) {
        headers[key] = value;
      }
    }

    if(!response.ok) {
      const error = new HttpError(responseData.message || 'Request failed', {
        data: responseData,
        status: response.status,
        headers
      });
      throw error;
    }

    // Return both the response data and the headers
    return {
      data: responseData,
      headers: headers
    };
  }

  /**
   * Sends an HTTP GET request.
   * @param {string} url - The URL of the request.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  get(url, config = {}) {
    return this.request({ ...config, url, method: 'GET' });
  }

  /**
   * Sends an HTTP POST request.
   * @param {string} url - The URL of the request.
   * @param {object} [data={}] - The request data.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  post(url, data = {}, config = {}) {
    return this.request({ ...config, url, method: 'POST', data });
  }

  /**
   * Sends an HTTP PUT request.
   * @param {string} url - The URL of the request.
   * @param {object} [data={}] - The request data.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  put(url, data = {}, config = {}) {
    return this.request({ ...config, url, method: 'PUT', data });
  }

  /**
   * Sends an HTTP PATCH request.
   * @param {string} url - The URL of the request.
   * @param {object} [data={}] - The request data.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  patch(url, data = {}, config = {}) {
    return this.request({ ...config, url, method: 'PATCH', data });
  }

  /**
   * Sends an HTTP DELETE request.
   * @param {string} url - The URL of the request.
   * @param {object} [config={}] - The request configuration.
   * @returns {Promise<object>} - The response data.
   */
  delete(url, config = {}) {
    return this.request({ ...config, url, method: 'DELETE' });
  }
}

export default FetchHttpClient;
