/**
 * @class
 * @description GetItemsUseCase is a use case that handles retrieving item information 
 * from either a fake data repository or an external resource data repository, depending on the provided sourceName.
 */
class GetItemsUseCase {
  /**
   * @constructor
   * @param {Object} params - The constructor parameters.
   * @param {FakeDataRepository} params.fakeDataRepository - A data repository for generating and retrieving fake item data.
   * @param {ExternalResourceDataRepository} params.externalResourceDataRepository - A data repository for fetching item data from an external resource.
   */
  constructor({fakeDataRepository, externalResourceDataRepository}) {
    this.fakeDataRepository = fakeDataRepository;
    this.externalResourceDataRepository = externalResourceDataRepository;
  }

  /**
   * Executes a get item operation using either the fake data repository or the external resource data repository, 
   * depending on the provided sourceName. The operation fetches the data for a particular item, identified by the query string.
   * @async
   * @param {string} query - The unique identifier of the item to fetch.
   * @param {string} sourceName - The name of the data source to use for fetching the data. It should match the name of one of the properties of this use case instance (i.e., either 'fakeDataRepository' or 'externalResourceDataRepository').
   * @returns {Promise<any>} A promise that resolves to the fetched item data. 
   * @throws Will throw an error if the provided sourceName doesn't match any of the available repositories.
   */
  async execute(query, sourceName) {
    // Validate sourceName
    if (!(sourceName in this)) throw new Error(`Invalid sourceName '${sourceName}' at [${this.constructor.name}]`);
    const data = await this[sourceName].read(query);
    return data;
  }
}

export default GetItemsUseCase;