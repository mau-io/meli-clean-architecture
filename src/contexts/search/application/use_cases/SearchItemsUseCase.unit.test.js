import SearchItemsUseCase from './SearchItemsUseCase';
import {jest} from '@jest/globals';

describe('SearchItemsUseCase', () => {
  const mockFakeDataRepository = {
    read: jest.fn(),
  };
  const mockExternalResourceDataRepository = {
    read: jest.fn(),
  };

  const useCase = new SearchItemsUseCase({
    fakeDataRepository: mockFakeDataRepository,
    externalResourceDataRepository: mockExternalResourceDataRepository
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should throw an error for invalid sourceName', async() => {
    const query = 'test';
    const options = {};
    const sourceName = 'invalidSource';

    await expect(useCase.execute(query, options, sourceName)).rejects.toThrow(`Invalid sourceName '${sourceName}' at [${useCase.constructor.name}]`);
  });

  test('should call read method on the correct repository based on sourceName', async() => {
    const query = 'test';
    const options = {};
    const sourceName = 'fakeDataRepository';

    const mockResponse = {
      paging: {},
      categories: [],
      items: [],
    };

    mockFakeDataRepository.read.mockResolvedValue(mockResponse);

    const data = await useCase.execute(query, options, sourceName);

    expect(data).toEqual({
      paging: mockResponse.paging,
      categories: [],
      items: mockResponse.items,
    });

    expect(mockFakeDataRepository.read).toHaveBeenCalledWith(query, options);
    expect(mockExternalResourceDataRepository.read).not.toHaveBeenCalled();
  });
});
