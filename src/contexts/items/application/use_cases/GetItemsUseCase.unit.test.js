import GetItemsUseCase from './GetItemsUseCase';
import {jest} from '@jest/globals';

describe('GetItemsUseCase', () => {
  let useCase;
  let fakeDataRepository;
  let externalResourceDataRepository;

  beforeEach(() => {
    // Create mock repositories
    fakeDataRepository = {
      read: jest.fn().mockResolvedValue({items: ['fake item 1', 'fake item 2']}),
    };
    externalResourceDataRepository = {
      read: jest.fn().mockResolvedValue({items: ['external item 1', 'external item 2']}),
    };

    // Instantiate the use case with the mock repositories
    useCase = new GetItemsUseCase({fakeDataRepository, externalResourceDataRepository});
  });

  test('should throw an error if the sourceName is invalid', async() => {
    const invalidSourceName = 'invalidSourceName';
    await expect(useCase.execute('query', invalidSourceName)).rejects.toThrow(`Invalid sourceName '${invalidSourceName}' at [GetItemsUseCase]`);
  });

  test('should call the correct repository based on the sourceName', async() => {
    const query = 'query';
    // Use the fakeDataRepository
    await useCase.execute(query, 'fakeDataRepository');
    expect(fakeDataRepository.read).toHaveBeenCalledWith(query);
    expect(externalResourceDataRepository.read).not.toHaveBeenCalled();

    // Use the externalResourceDataRepository
    await useCase.execute(query, 'externalResourceDataRepository');
    expect(externalResourceDataRepository.read).toHaveBeenCalledWith(query);
    expect(fakeDataRepository.read).toHaveBeenCalledTimes(1); // It was only called in the first test
  });

  test('should return the data from the correct repository', async() => {
    const query = 'query';

    let data;

    // Use the fakeDataRepository
    data = await useCase.execute(query, 'fakeDataRepository');
    expect(data).toEqual({items: ['fake item 1', 'fake item 2']});

    // Use the externalResourceDataRepository
    data = await useCase.execute(query, 'externalResourceDataRepository');
    expect(data).toEqual({items: ['external item 1', 'external item 2']});
  });
});
