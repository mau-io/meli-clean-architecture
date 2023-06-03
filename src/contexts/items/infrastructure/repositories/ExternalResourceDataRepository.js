import AuthorEntity from '#src/contexts/items/domain/entities/AuthorEntity.js';
import ItemEntity from '#src/shared/domain/entities/ItemEntity.js';
import PriceEntity from '#src/shared/domain/entities/PriceEntity.js';

import AbstractDataRepository from '#src/shared/infrastructure/repositories/AbstractDataRepository.js';

import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';
import countDecimals from '#src/common/infrastructure/lib/countDecimals.js';

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
   * @param {string} itemId - The search query.
   * @returns {Promise<object>} A promise that resolves to an object containing 
   * fake data for paging, categories and items.
   */
  async read(itemId) {
    /*
      ttps://api.mercadolibre.com/items/:id
      https://api.mercadolibre.com/items/:id/description
    */

    const url = `${this.config.url}/items/${itemId}`;
    const urlDescription = `${url}/description`;

    try {

      const [response, responseDescription] = await Promise.all([
        await this.httpClient.get(url, {
          timeout: this.config.httpClientTimeout
        }),
        await this.httpClient.get(urlDescription, {
          timeout: this.config.httpClientTimeout
        })
      ]);
     
      const {id, title, thumbnail, condition, shipping, attributes, sold_quantity} = response.data;

      const {name,  lastname} = this._getAuthorNameAndSurname(attributes);
      const author = new AuthorEntity(
        name,
        lastname,
      );

      const price = new PriceEntity(
        response.data.currency_id,
        response.data.price,
        countDecimals(response.price)
      );

      const item = new ItemEntity({
        id,
        title,
        price,
        picture: thumbnail,
        condition,
        freeShipping: shipping.free_shipping,
        soldQuantity: sold_quantity || 0,
        description: responseDescription.data.plain_text || ''
      });

      const result = {
        author,
        item
      };

      return result;
    } catch (error) {

      let status = HTTP_STATUS_CODES.GATEWAY_TIMEOUT;
      let { message } = error;
      let errors = [error];
      
      if(error?.response?.status === HTTP_STATUS_CODES.NOT_FOUND) {
        status = HTTP_STATUS_CODES.NOT_FOUND;
        message = `Item '${itemId}' not found. Please check the provided identifier and try again`;
        errors = [];
      }

      throw new ApplicationError(status, message, errors);

    }
  }

  _getAuthorNameAndSurname(attributes) {
    const authorAttribute = attributes.find(
      attribute => attribute.id === 'AUTHOR'
    );

    if (!authorAttribute || !authorAttribute.value_name) {
      return { name: undefined, lastname: undefined };
    }

    const [lastname, name] = (authorAttribute.value_name || '')
      .split(',')
      .map(value => value.trim());

    return {
      name,
      lastname
    };
  }
}

export default ExternalResourceDataRepository;