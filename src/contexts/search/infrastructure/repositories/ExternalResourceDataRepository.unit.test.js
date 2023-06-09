import ExternalResourceDataRepository from './ExternalResourceDataRepository';
import ItemEntity from '#src/shared/domain/entities/ItemEntity.js';
import PagingEntity from '#src/contexts/search/domain/entities/PagingEntity.js';
import PriceEntity from '#src/shared/domain/entities/PriceEntity.js';
import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import {jest} from '@jest/globals';

describe('ExternalResourceDataRepository', () => {
  const mockHttpClient = {
    get: jest.fn(),
  };
  const mockConfig = {
    url: 'http://test.com',
  };
  
  const repository = new ExternalResourceDataRepository(mockHttpClient, mockConfig);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should generate items as an array with correct schema', async() => {
    const query = 'test';
    const options = {
      limit: 10,
      offset: 0,
      site: 'site1',
      sort: 'price_asc'
    };

    const mockData = {
      data: {
        filters: [],
        available_filters: [],
        results: [
          {
            id: 'MLA1',
            title: 'Item 1',
            thumbnail: 'http://example.com/pic-1.jpg',
            condition: 'new',
            shipping: {
              free_shipping: true,
            },
            currency_id: 'USD',
            price: 1,
          },
        ],
        paging: {
          total: 1,
          offset: 0,
          limit: 10
        }
      }
    };

    mockHttpClient.get.mockResolvedValue(mockData);

    const data = await repository.read(query, options);
  
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

  test('should call http client with correct parameters', async() => {
    const query = 'test';
    const options = {
      limit: 10,
      offset: 0,
      site: 'site1',
      sort: 'price_asc'
    };

    const mockData = {
      data: {
        filters: [],
        available_filters: [],
        results: [],
        paging: {
          total: 0,
          offset: 0,
          limit: 10
        }
      }
    };

    mockHttpClient.get.mockResolvedValue(mockData);

    await repository.read(query, options);

    expect(mockHttpClient.get).toHaveBeenCalledWith(`${mockConfig.url}/sites/${options.site}/search`, expect.any(Object));
  });

  test('should return correct data', async() => {
    const query = 'test';
    const options = {
      limit: 10,
      offset: 0,
      site: 'site1',
      sort: 'price_asc'
    };

    const mockData = {
      data: {
        filters: [],
        available_filters: [],
        results: [
          {
            id: 'MLA1',
            title: 'Item 1',
            thumbnail: 'http://example.com/pic-1.jpg',
            condition: 'new',
            shipping: {
              free_shipping: true,
            },
            currency_id: 'USD',
            price: 1,
          },
        ],
        paging: {
          total: 1,
          offset: 0,
          limit: 10
        }
      }
    };

    mockHttpClient.get.mockResolvedValue(mockData);

    const data = await repository.read(query, options);

    expect(data.paging).toBeInstanceOf(PagingEntity);
    expect(data.paging.total).toEqual(mockData.data.paging.total);
    expect(data.paging.offset).toEqual(mockData.data.paging.offset);
    expect(data.paging.limit).toEqual(mockData.data.paging.limit);

    expect(data.categories.length).toEqual(0);

    expect(data.items.length).toEqual(mockData.data.results.length);
    const item = data.items[0];
    const mockItem = mockData.data.results[0];

    expect(item).toBeInstanceOf(ItemEntity);
    expect(item.id).toEqual(mockItem.id);
    expect(item.title).toEqual(mockItem.title);
    expect(item.price).toBeInstanceOf(PriceEntity);
    expect(item.price.currency).toEqual(mockItem.currency_id);
    expect(item.price.amount).toEqual(mockItem.price);
    expect(item.picture).toEqual(mockItem.thumbnail);
    expect(item.condition).toEqual(mockItem.condition);
    expect(item.free_shipping).toEqual(mockItem.shipping.free_shipping);

  });

  test('should throw ApplicationError when http client throws an error', async() => {
    const query = 'test';
    const options = {
      limit: 10,
      offset: 0,
      site: 'site1',
      sort: 'price_asc'
    };

    mockHttpClient.get.mockRejectedValue(new Error('Network error'));

    await expect(repository.read(query, options)).rejects.toThrow(ApplicationError);
  });
});
