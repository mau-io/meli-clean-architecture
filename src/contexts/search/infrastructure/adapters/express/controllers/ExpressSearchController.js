import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import PrettyError from '#src/shared/infrastructure/utils/PrettyError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';

class ExpressSearchController {
  constructor(searchController, logger) {
    this.searchController = searchController;
    this.logger = logger;
  }

  async handleSearch(req, res, next) {
    try {
      
      const params = {
        ...req.query,
        sourceName: req.sourceName,
      };

      const response = await this.searchController.handleSearch(params);

      res
        .status(HTTP_STATUS_CODES.OK)
        .json(response);

    } catch(error) {
      next(error);
    }
  }
}

export default ExpressSearchController;
