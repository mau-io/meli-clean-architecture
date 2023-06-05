import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import PrettyError from '#src/shared/infrastructure/utils/PrettyError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';

class ExpressItemsController {
  constructor(itemsController, logger) {
    this.itemsController = itemsController;
    this.logger = logger;
  }

  async handleGetItem(req, res) {
    try {
      
      const params = {
        itemId: req.params.id,
        sourceName: req.sourceName,
      };

      const response = await this.itemsController.handleGetItem(params);

      res
        .status(HTTP_STATUS_CODES.OK)
        .json(response);

    } catch(error) {
      if (error instanceof ApplicationError) {
        this.logger.warn({
          title: '[ExpressItemsController] WARM',
          data: error
        });
        res
          .status(error.status)
          .json(error);
      } else {
        PrettyError.format(error);
        this.logger.error({
          title: '[ExpressItemsController] ERROR',
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

export default ExpressItemsController;
