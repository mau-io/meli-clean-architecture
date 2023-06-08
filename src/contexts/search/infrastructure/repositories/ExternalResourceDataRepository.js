import CategoryEntity from '#src/contexts/search/domain/entities/CategoryEntity.js';
import ItemEntity from '#src/shared/domain/entities/ItemEntity.js';
import PagingEntity from '#src/contexts/search/domain/entities/PagingEntity.js';
import PriceEntity from '#src/shared/domain/entities/PriceEntity.js';

import AbstractDataRepository from '#src/shared/infrastructure/repositories/AbstractDataRepository.js';
import countDecimals from '#src/common/infrastructure/lib/countDecimals.js';

import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';

/**
 * ExternalResourceDataRepository class extends AbstractDataRepository to provide mock data
 * for testing or development purposes. This class creates fake items,
 * categories, and pagination information.
 * @extends AbstractDataRepository
 */
class ExternalResourceDataRepository extends AbstractDataRepository {
  /**
   * @constructor
   * @typedef {import('#src/common/infrastructure/http/AbstractHttpClient').HttpClient} HttpClient
   * @param {HttpClient} httpClient - A HTTP client.
   */
  constructor(httpClient, config) {
    super();
    this.httpClient = httpClient;
    this.config = config;
  }

  /**
   * Generates and returns fake data for categories and items. The amount of
   * items returned can be adjusted using the limit option.
   *
   * @param {string} query - The search query.
   * @param {object} options - The options for generating fake data.
   * @param {number} options.limit - The maximum number of items to generate.
   * @param {number} options.offset - The starting point for generating item IDs.
   * @param {string} options.site - The site to search on.
   * @param {string} options.sort - The sorting criteria for the search results.
   * @returns {Promise<object>} A promise that resolves to an object containing 
   * fake data for paging, categories and items.
   */
  async read(query, options) {
    const url = `${this.config.url}/sites/${options.site}/search`;
    const params = {
      q: query,
      ...options
    };

    try {
      const { data } = await this.httpClient.get(url, {
        params,
        timeout: this.config.httpClientTimeout
      });
    
      const categoryFilter = this._findFilter(data);
      const categories = categoryFilter 
        ? categoryFilter.values.map(value => new CategoryEntity(value.name)) 
        : [];

      // Items
      const items = data
        .results
        .map(result => {
          const {id, title, thumbnail, condition, shipping} = result;

          const price = new PriceEntity(
            result.currency_id,
            result.price,
            countDecimals(result.price)
          );

          return new ItemEntity({
            id,
            title,
            price,
            picture: thumbnail,
            condition,
            freeShipping: shipping.free_shipping
          });
        });

      // Paging
      const paging = new PagingEntity(
        data.paging.total,
        data.paging.offset,
        data.paging.limit
      );

      const result = {
        paging,
        categories,
        items
      };

      return result;
    } catch (error) {
      throw new ApplicationError(
        HTTP_STATUS_CODES.GATEWAY_TIMEOUT,
        error.message,
        [error]
      );
    }
  }

  _findFilter(data) {
    const CATEGORY_FILTER_ID = 'category';
    // Try to find category filter in filters or available_filters
    const filters = (
      data.filters?.length
        ? data.filters
        : data.available_filters
    )
      ?.find(filter => filter.id === CATEGORY_FILTER_ID);
    return filters;
  }

}

export default ExternalResourceDataRepository;