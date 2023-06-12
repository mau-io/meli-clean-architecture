import AuthorEntity from '#src/contexts/items/domain/entities/AuthorEntity.js';
import ItemEntity from '#src/shared/domain/entities/ItemEntity.js';
import PriceEntity from '#src/shared/domain/entities/PriceEntity.js';

import AbstractDataRepository from '#src/shared/infrastructure/repositories/AbstractDataRepository.js';

import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';
import countDecimals from '#src/common/infrastructure/lib/countDecimals.js';

/**
 * ExternalResourceDataRepository class extends AbstractDataRepository.
 * It's a concrete repository implementation for fetching data from external resources.
 * @extends AbstractDataRepository
 */
class ExternalResourceDataRepository extends AbstractDataRepository {
  /**
   * @constructor
   * @typedef {import('#src/common/infrastructure/http/AbstractHttpClient').HttpClient} HttpClient
   * @param {HttpClient} httpClient - A HTTP client to perform requests to the external resource.
   * @param {object} config - A configuration object for this repository. 
   */
  constructor(httpClient, config) {
    super();
    this.httpClient = httpClient;
    this.config = config;
  }

  /**
   * Retrieves the data for a particular item from the external resource.
   * @param {string} itemId - The unique identifier for the item.
   * @returns {Promise<object>} A promise that resolves to an object containing 
   */
  async read(itemId) {

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

  /**
   * Extracts the name and surname of the author from the attributes of an item.
   * @private
   * @param {Array} attributes - The attributes of an item.
   * @returns {Object} An object with properties 'name' and 'lastname', 
   * both containing strings or undefined if the author's name wasn't found among the attributes.
   */
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