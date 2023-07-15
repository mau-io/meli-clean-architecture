import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import PrettyError from '#src/shared/infrastructure/utils/PrettyError.js';
import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';

class errorHandlerMiddleware {
  constructor(logger) {
    this.logger = logger || console;
    this.getMiddleware = this.getMiddleware.bind(this);
  }

  getMiddleware(err, req, res, next) {
    if (err instanceof ApplicationError) {
      this.logger.warn({
        title: '[ErrorHandlerMiddleware] WARN',
        data: err
      });
  
      res
        .status(err.status)
        .json(err);
  
    } else {
      PrettyError.format(err);
      this.logger.error({
        title: '[ErrorHandlerMiddleware] ERROR',
        data: err
      });
  
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: err.message,
          errors: [],
        });
    }

    next();
  }

  setLogger(logger) {
    this.logger = logger;
    return this;
  }
}

export default errorHandlerMiddleware;
