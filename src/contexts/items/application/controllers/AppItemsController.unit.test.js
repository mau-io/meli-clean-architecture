import AppItemsController from './AppItemsController';
import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import {jest} from '@jest/globals';

describe('AppItemsController', () => {
  const mockGetItemsUseCase = {
    execute: jest.fn(),
  };
  const mockValidator = {
    validate: jest.fn(),
  };

  const controller = new AppItemsController(mockGetItemsUseCase, mockValidator);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call use case with correct parameters', async() => {
    const params = {
      itemId: '123',
      sourceName: 'test-source',
    };

    await controller.handleGetItem(params);

    expect(mockGetItemsUseCase.execute).toHaveBeenCalledWith(params.itemId, params.sourceName);
  });

  test('should throw ApplicationError when validation fails', async() => {
    
    const params = {
      itemId: '',
    };

    const mockErrors = ['error1', 'error2'];
    mockValidator.validate.mockReturnValue(mockErrors);

    await expect(controller.handleGetItem(params)).rejects.toThrow(ApplicationError);
    expect(mockValidator.validate).toHaveBeenCalled();
  });

  test('should handle errors thrown by use case', async() => {
    const params = {
      itemId: '123',
      sourceName: 'test-source',
    };
    const mockError = new ApplicationError(400, 'Invalid input data in AppItemsController');
    mockGetItemsUseCase.execute.mockRejectedValue(mockError);

    await expect(controller.handleGetItem(params)).rejects.toThrow(mockError);
  });

  test('should return correct result when use case execution is successful', async() => {
    const params = {
      itemId: '123',
      sourceName: 'test-source',
    };
    const mockResult = { id: '123', title: 'Item title' };
    mockGetItemsUseCase.execute.mockResolvedValue(mockResult);
  
    // Set the mock validator to return null (i.e., no errors).
    mockValidator.validate.mockReturnValue(null);
  
    const result = await controller.handleGetItem(params);
  
    expect(result).toEqual(mockResult);
  });

});
