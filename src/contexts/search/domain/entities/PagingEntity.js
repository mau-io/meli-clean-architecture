/**
 * Represents paging information.
 * @class
 */
class PagingEntity {
  /**
   * Validates the provided parameters.
   * @param {number} total - The total number of items.
   * @param {number} offset - The offset of the current page.
   * @param {number} limit - The maximum number of items per page.
   * @param {string} className - The name of the class for the error message.
   * @throws {Error} If any of the parameters are not numbers.
   */
  static validate(total, offset, limit, className) {
    const generateErrorMessage = (fieldName, className, expectedType, receivedType) =>
      `Invalid type for '${fieldName}' in ${className}. Expected ${expectedType}, but received ${receivedType}.`;
  
    if (typeof total !== 'number') {
      throw new Error(generateErrorMessage('total', className, 'number', typeof total));
    }
    if (typeof offset !== 'number') {
      throw new Error(generateErrorMessage('offset', className, 'number', typeof offset));
    }
    if (typeof limit !== 'number') {
      throw new Error(generateErrorMessage('limit', className, 'number', typeof limit));
    }
  }

  /**
   * Creates a new PagingEntity instance.
   * @param {number} total - The total number of items.
   * @param {number} offset - The offset of the current page.
   * @param {number} limit - The maximum number of items per page.
   */
  constructor(total = 0, offset = 0, limit = 10) {
    PagingEntity.validate(total, offset, limit, this.constructor.name);
    this.total = total;
    this.offset = offset;
    this.limit = limit;
  }
}

export default PagingEntity;
