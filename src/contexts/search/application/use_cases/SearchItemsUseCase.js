/**
 * @class
 * @description Handles searching for items and returns a response that includes the categories of the items, 
 * paging details, and the list of items itself, sorted according to the specified criteria.
 */
class SearchItemsUseCase {
  /**
   * @constructor
   */
  constructor({fakeDataRepository, externalResourceDataRepository}) {
    this.fakeDataRepository = fakeDataRepository;
    this.externalResourceDataRepository = externalResourceDataRepository;
  }

  /**
   * Options for the search.
   * @typedef {Object} SearchOptions
   * @property {string} site - The site to search on.
   * @property {string} sort - The sorting criteria for the search results.
   * @property {number} limit - The maximum number of search results to retrieve.
   * @property {number} offset - The offset for paginated search results.
   */
  
  /**
   * Executes a search query with the provided options.
   * @async
   * @param {string} query - The search query.
   * @param {SearchOptions} options - The options for the search.
   * @returns {Promise<any>} A promise that resolves to the search results.
   */
  async execute(query, options, sourceName) {

    // Validate sourceName
    if (!(sourceName in this)) throw new Error(`Invalid sourceName '${sourceName}' at [${this.constructor.name}]`);

    const {
      paging,
      categories,
      items
    } = await this[sourceName].read(query, options);
 
    const data = {
      paging,
      categories: categories.map(category => category.name), // Convert Category entities to strings
      items
    };

    return data;
  }
}

export default SearchItemsUseCase;