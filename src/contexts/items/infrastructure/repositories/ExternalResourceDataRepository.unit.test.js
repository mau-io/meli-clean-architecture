import {jest} from '@jest/globals';
import ExternalResourceDataRepository from './ExternalResourceDataRepository';
import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import AuthorEntity from '#src/contexts/items/domain/entities/AuthorEntity.js';
import ItemEntity from '#src/shared/domain/entities/ItemEntity.js';
import PriceEntity from '#src/shared/domain/entities/PriceEntity.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';

describe('ExternalResourceDataRepository', () => {
  const mockHttpClient = {
    get: jest.fn(),
  };

  const mockConfig = {
    url: 'http://test.com',
    timeout: 10000,
  };

  const repository = new ExternalResourceDataRepository(mockHttpClient, mockConfig);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call http client with correct parameters', async() => {
    const itemId = 'test';
    const options = {};
    const mockData = {
      data: {
        id: itemId,
        title: 'Item title',
        thumbnail: 'http://example.com/pic-1.jpg',
        condition: 'new',
        shipping: {
          free_shipping: true,
        },
        attributes: [],
        sold_quantity: 5,
        price: 1000,
        currency_id: 'USD'
      }
    };
    const mockDescriptionData = {
      data: {
        plain_text: 'Item description',
      },
    };

    mockHttpClient.get.mockResolvedValueOnce(mockData)
      .mockResolvedValueOnce(mockDescriptionData);

    await repository.read(itemId, options);

    expect(mockHttpClient.get).toHaveBeenCalledWith(`${mockConfig.url}/items/${itemId}`, expect.any(Object));
    expect(mockHttpClient.get).toHaveBeenCalledWith(`${mockConfig.url}/items/${itemId}/description`, expect.any(Object));
  });

  test('should return correct data', async() => {
    const itemId = 'test';
    const options = {};

    const mockData = {
      data: {
        id: itemId,
        title: 'Item title',
        thumbnail: 'http://example.com/pic-1.jpg',
        condition: 'new',
        shipping: {
          free_shipping: true,
        },
        attributes: [],
        sold_quantity: 5,
        price: 1000,
        currency_id: 'USD'
      }
    };
    const mockDescriptionData = {
      data: {
        plain_text: 'Item description',
      },
    };

    mockHttpClient.get.mockResolvedValueOnce(mockData)
      .mockResolvedValueOnce(mockDescriptionData);

    const data = await repository.read(itemId, options);

    expect(data.author).toBeInstanceOf(AuthorEntity);
    expect(data.item).toBeInstanceOf(ItemEntity);
    expect(data.item.price).toBeInstanceOf(PriceEntity);
    expect(data.item.id).toEqual(itemId);
    expect(data.item.title).toEqual(mockData.data.title);
    expect(data.item.price.amount).toEqual(mockData.data.price);
    expect(data.item.price.currency).toEqual(mockData.data.currency_id);
    expect(data.item.picture).toEqual(mockData.data.thumbnail);
    expect(data.item.condition).toEqual(mockData.data.condition);
    expect(data.item.free_shipping).toEqual(mockData.data.shipping.free_shipping);
    expect(data.item.sold_quantity).toEqual(mockData.data.sold_quantity);
    expect(data.item.description).toEqual(mockDescriptionData.data.plain_text);
  });

  test('should throw ApplicationError when http client throws an error', async() => {
    const itemId = 'test';
    const options = {};

    mockHttpClient.get.mockRejectedValue(new Error('Network error'));

    await expect(repository.read(itemId, options)).rejects.toThrow(ApplicationError);
  });

  test('should throw ApplicationError with correct status and message when item not found', async() => {
    const itemId = 'test';
    const options = {};

    const mockError = {
      response: {
        status: HTTP_STATUS_CODES.NOT_FOUND
      }
    };

    mockHttpClient.get.mockRejectedValue(mockError);

    await expect(repository.read(itemId, options)).rejects.toThrow(ApplicationError);
    await expect(repository.read(itemId, options)).rejects.toThrow(`Item '${itemId}' not found. Please check the provided identifier and try again`);
  });
});
