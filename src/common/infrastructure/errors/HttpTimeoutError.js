/**
 * Custom error class representing a timeout error.
 * @class
 * @extends {Error}
 */
class HttpTimeoutError extends Error {
  /**
   * Creates a new HttpTimeoutError instance.
   * @param {string} [message='Request timed out'] - The error message.
   */
  constructor(message = 'Request timed out') {
    super(message);
    this.name = 'HttpTimeoutError';
    this.code = 'ETIMEDOUT';
  }
}

export default HttpTimeoutError;
