import FakeDataRepository from './FakeDataRepository';
import ItemEntity from '#src/shared/domain/entities/ItemEntity.js';
import PagingEntity from '#src/contexts/search/domain/entities/PagingEntity.js';
import PriceEntity from '#src/shared/domain/entities/PriceEntity.js';
import CategoryEntity from '#src/contexts/search/domain/entities/CategoryEntity.js';

describe('FakeDataRepository', () => {
  const repository = new FakeDataRepository();

  test('should generate correct amount of items', async() => {
    const options = {
      limit: 10,
      offset: 0,
      site: 'test',
      sort: 'price_asc'
    };
    const data = await repository.read(null, options);

    expect(data.items.length).toEqual(options.limit);
  });

  test('should generate items as an array with correct schema', async() => {
    const options = {
      limit: 10,
      offset: 0,
      site: 'test',
      sort: 'price_asc'
    };
  
    const data = await repository.read(null, options);
  
    // Check if items is an array
    expect(Array.isArray(data.items)).toBe(true);
    expect(data.paging).toBeInstanceOf(PagingEntity);

    // Check schema for each item in the array
    data.items.forEach(item => {
      expect(item).toBeInstanceOf(ItemEntity);
      expect(typeof item.id).toBe('string');
      expect(typeof item.title).toBe('string');
      expect(item.price).toBeInstanceOf(PriceEntity);
      expect(typeof item.price.currency).toBe('string');
      expect(typeof item.price.amount).toBe('number');
      expect(typeof item.price.decimals).toBe('number');
      expect(typeof item.picture).toBe('string');
      expect(typeof item.condition).toBe('string');
      expect(typeof item.free_shipping).toBe('boolean');
    });
  });
  
  test('should generate correct categories', async() => {
    const options = {
      limit: 1,
      offset: 0,
      site: 'test',
      sort: 'price_asc'
    };
    const data = await repository.read(null, options);

    expect(Array.isArray(data.categories)).toBe(true);
    data.categories.forEach(category => {
      expect(category).toBeInstanceOf(CategoryEntity);
    });
  });

  test('should generate correct paging schema', async() => {
    const options = {
      limit: 1,
      offset: 0,
      site: 'test',
      sort: 'price_asc'
    };
    const data = await repository.read(null, options);

    expect(data.paging).toBeInstanceOf(PagingEntity);
    expect(typeof data.paging.total).toBe('number');
    expect(typeof data.paging.offset).toBe('number');
    expect(typeof data.paging.limit).toBe('number');
  });

  test('should generate correct paging', async() => {
    const options = {
      limit: 1,
      offset: 0,
      site: 'test',
      sort: 'price_asc'
    };
    const data = await repository.read(null, options);

    expect(data.paging).toBeInstanceOf(PagingEntity);
    expect(data.paging.total).toEqual(options.limit);
    expect(data.paging.offset).toEqual(options.offset);
    expect(data.paging.limit).toEqual(options.limit);
  });
});
