import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';
import { AVAILABLE_SORTS } from '#src/shared/infrastructure/utils/sortItemsByCriteria.js';

class AppSearchController {

  constructor(searchItemsUseCase, validator, config) {
    this.searchItemsUseCase = searchItemsUseCase;
    this.validator = validator;
    this.config = config;
  }

  getHandleSearchValidationRules() {
    return {
      query: { type: 'string', required: true, min: 1, max: 50 },
      site: { type: 'enum', required: true, values: this.config.availableSites },
      sort: { type: 'enum', required: false, values: AVAILABLE_SORTS },
      limit: { type: 'limit', required: false },
      offset: { type: 'offset', required: false }
    };
  }

  async handleSearch(params) {
      
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

    const defaultValues = {
      sort: AVAILABLE_SORTS[0],
      limit: 10,
      offset: 0
    };

    const options = {
      site: params.site,
      sort: params.sort ?? defaultValues.sort,
      limit: parseInt(params.limit, 10) || defaultValues.limit,
      offset: parseInt(params.offset, 10) || defaultValues.offset
    };

    const data = await this.searchItemsUseCase.execute(
      params.query,
      options,
      params.sourceName
    );

    return data;
  }
}

export default AppSearchController;