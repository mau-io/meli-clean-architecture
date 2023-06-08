import AbstractDataRepository from '#src/shared/infrastructure/repositories/AbstractDataRepository.js';

import CategoryEntity from '#src/contexts/search/domain/entities/CategoryEntity.js';
import ItemEntity from '#src/shared/domain/entities/ItemEntity.js';
import PagingEntity from '#src/contexts/search/domain/entities/PagingEntity.js';
import PriceEntity from '#src/shared/domain/entities/PriceEntity.js';

import sortItemsByCriteria from '#src/shared/infrastructure/utils/sortItemsByCriteria.js';
/**
 * FakeDataRepository class extends AbstractDataRepository to provide mock data
 * for testing or development purposes. This class creates fake items,
 * categories, and pagination information.
 * @extends AbstractDataRepository
 */
class FakeDataRepository extends AbstractDataRepository {
  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Generates and returns fake data for categories and items. The amount of
   * items returned can be adjusted using the limit option.
   *
   * @param {null} _ - This parameter is ignored in this implementation.
   * @param {object} options - The options for generating fake data.
   * @param {number} options.limit - The maximum number of items to generate.
   * @param {number} options.offset - The starting point for generating item IDs.
   * @param {string} options.site - The site to search on.
   * @param {string} options.sort - The sorting criteria for the search results.
   * @returns {Promise<object>} A promise that resolves to an object containing 
   * fake data for paging, categories and items.
   */
  async read(_, options) {

    // Instantiate the entities
    const categories = [
      new CategoryEntity('Electrónica'),
      new CategoryEntity('Celulares y Smartphones')
    ];

    // Create the list of items
    const items = Array.from({
      length: options.limit 
    }, (_, index) => {

      const itemId = index + options.offset + 1;
      const id = `MLA${itemId}`;
      const title = `Item ${itemId}`;
      const price = new PriceEntity('USD', itemId, 0);
      const picture = `http://example.com/pic-${itemId}.jpg`;
      
      return new ItemEntity({
        id,
        title,
        price,
        picture,
        condition: 'new',
        freeShipping: true
      });
   
    });

    const paging = new PagingEntity(
      items.length,
      options.offset,
      options.limit
    );

    sortItemsByCriteria(items, options.sort);

    const result = {
      paging,
      categories,
      items
    };

    return result;
  }

}

export default FakeDataRepository;