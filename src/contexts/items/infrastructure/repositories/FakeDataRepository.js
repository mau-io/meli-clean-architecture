import AbstractDataRepository from '#src/shared/infrastructure/repositories/AbstractDataRepository.js';

import AuthorEntity from '#src/contexts/items/domain/entities/AuthorEntity.js';
import ItemEntity from '#src/shared/domain/entities/ItemEntity.js';
import PriceEntity from '#src/shared/domain/entities/PriceEntity.js';

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
   * @param {string} itemId - The search query.
   * @returns {Promise<object>} A promise that resolves to an object containing 
   * fake data for paging, categories and items.
   */
  async read(itemId) {

    const item = new ItemEntity({
      id: itemId,
      title: `Item ${itemId}`,
      price: new PriceEntity('USD', 1, 0),
      picture: `http://example.com/pic-${itemId}.jpg`,
      condition: 'new',
      freeShipping: true,
      soldQuantity: 1,
      description: 'Lorem ipsum dolor sit amet. Id minus quasi est fugiat quibusdam aut odit voluptatibus. Et voluptas ipsum est repellendus nostrum ut minima odio ut aperiam galisum ut harum quia nam quis expedita qui ipsa quia.'
    });

    const author = new AuthorEntity(
      'Jin',
      'Runcandel',
    );
    
    const result = {
      author,
      item
    };

    return result;
  }

}

export default FakeDataRepository;