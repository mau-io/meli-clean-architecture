import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import PrettyError from '#src/shared/infrastructure/utils/PrettyError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';

class ExpressItemsController {
  constructor(itemsController, logger) {
    this.itemsController = itemsController;
    this.logger = logger;
  }

  async handleGetItem(req, res, next) {
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
      next(error);
    }
  }
}

export default ExpressItemsController;
