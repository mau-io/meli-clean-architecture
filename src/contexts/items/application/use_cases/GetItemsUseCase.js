/**
 * @class
 * @description 
 */
class GetItemsUseCase {
  /**
   * @constructor
   */
  constructor({fakeDataRepository, externalResourceDataRepository}) {
    this.fakeDataRepository = fakeDataRepository;
    this.externalResourceDataRepository = externalResourceDataRepository;
  }

  /**
   * Executes a get item query with the provided options.
   * @async
   * @param {string} query - The search query.
   * @returns {Promise<any>} A promise that resolves to the search results.
   */
  async execute(query, sourceName) {

    // Validate sourceName
    if (!(sourceName in this)) throw new Error(`Invalid sourceName '${sourceName}' at [${this.constructor.name}]`);

    const data = await this[sourceName].read(query);

    return data;
  }
}

export default GetItemsUseCase;