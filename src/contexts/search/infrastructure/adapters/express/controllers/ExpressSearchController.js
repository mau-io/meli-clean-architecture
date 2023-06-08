import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import PrettyError from '#src/shared/infrastructure/utils/PrettyError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';

class ExpressSearchController {
  constructor(searchController, logger) {
    this.searchController = searchController;
    this.logger = logger;
  }

  async handleSearch(req, res) {
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
      if (error instanceof ApplicationError) {
        this.logger.warn({
          title: '[ExpressSearchController] WARM',
          data: error
        });
        res
          .status(error.status)
          .json(error);
      } else {
        PrettyError.format(error);
        this.logger.error({
          title: '[ExpressSearchController] ERROR',
          data: error
        });
        res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message,
            errors: [],
          });
      }
    }
  }
}

export default ExpressSearchController;
