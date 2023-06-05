import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';

class AppItemsController {

  constructor(getItemsUseCase, validator) {
    this.getItemsUseCase = getItemsUseCase;
    this.validator = validator;
  }

  getHandleSearchValidationRules() {
    return {
      itemId: { type: 'meliId', required: true }
    };
  }

  async handleGetItem(params) {

    const errors = this
      .validator
      .validate(this.getHandleSearchValidationRules(), params);

    if(errors) {
      const className = this.constructor.name;
      const errorMessage = `Invalid input data in ${className}`;
      throw new ApplicationError(
        HTTP_STATUS_CODES.BAD_REQUEST,
        errorMessage,
        errors
      );
    }

    const data = await this.getItemsUseCase.execute(
      params.itemId,
      params.sourceName
    );

    return data;
  }
}

export default AppItemsController;