/**
 * Represents an application error.
 * @class
 * @extends Error
 */
class ApplicationError extends Error {
  /**
   * Creates a new ApplicationError instance.
   * @param {number} [status=500] - The HTTP status code associated with the error.
   * @param {string} [message='An unexpected ApplicationError occurred'] - The error message.
   * @param {Array} [errors=[]] - Additional error details.
   */
  constructor(status = 500, message = 'An unexpected ApplicationError occurred', errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  
  /**
   * Converts the ApplicationError instance to a JSON representation.
   * @returns {Object} The JSON representation of the error.
   */
  toJSON() {
    return {
      status: this.status,
      message: this.message,
      errors: this.errors,
    };
  }
}

export default ApplicationError;
