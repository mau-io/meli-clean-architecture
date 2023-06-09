import AppSearchController from './AppSearchController';
import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import {jest} from '@jest/globals';
describe('AppSearchController', () => {
  const mockUseCase = {
    execute: jest.fn(),
  };
  const mockValidator = {
    validate: jest.fn(),
  };
  const mockConfig = {
    availableSites: ['site1', 'site2'],
  };
  
  const controller = new AppSearchController(mockUseCase, mockValidator, mockConfig);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call use case with correct parameters', async() => {
    const params = {
      query: 'test',
      site: 'site1',
      sourceName: 'test-source'
    };

    await controller.handleSearch(params);

    expect(mockUseCase.execute).toHaveBeenCalledWith(params.query, expect.any(Object), params.sourceName);
  });

  test('should throw ApplicationError when validation fails', async() => {
    
    const params = {
      query: '',
      site: 'invalid site',
    };

    const mockErrors = ['error1', 'error2'];
    mockValidator.validate.mockReturnValue(mockErrors);

    await expect(controller.handleSearch(params)).rejects.toThrow(ApplicationError);
    expect(mockValidator.validate).toHaveBeenCalled();
  });

  test('should handle errors thrown by use case', async() => {
    const params = {
      query: 'test',
      site: 'site1',
    };
    const mockError = new ApplicationError(400, 'Invalid input data in AppSearchController');
    mockUseCase.execute.mockRejectedValue(mockError);

    await expect(controller.handleSearch(params)).rejects.toThrow(mockError);
  });
});
