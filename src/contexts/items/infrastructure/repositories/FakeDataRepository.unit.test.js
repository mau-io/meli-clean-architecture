import FakeDataRepository from './FakeDataRepository';
import ItemEntity from '#src/shared/domain/entities/ItemEntity.js';
import AuthorEntity from '#src/contexts/items/domain/entities/AuthorEntity.js';
import PriceEntity from '#src/shared/domain/entities/PriceEntity.js';
import {jest} from '@jest/globals';

describe('FakeDataRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new FakeDataRepository();
  });

  test('should return correct fake data', async() => {
    const itemId = 'test';
    const options = {
    };

    const data = await repository.read(itemId, options);

    expect(data.author).toEqual(expect.any(AuthorEntity));

    // Validate each property of the item individually.
    expect(data.item).toBeInstanceOf(ItemEntity);
    expect(data.item.id).toEqual(expect.any(String));
    expect(data.item.title).toEqual(expect.any(String));
    expect(data.item.price).toEqual(expect.any(PriceEntity));
    expect(data.item.picture).toEqual(expect.any(String));
    expect(data.item.condition).toEqual(expect.any(String));
    expect(data.item.free_shipping).toEqual(expect.any(Boolean));
    expect(data.item.sold_quantity).toEqual(expect.any(Number));
    expect(data.item.description).toEqual(expect.any(String));
  });

});
