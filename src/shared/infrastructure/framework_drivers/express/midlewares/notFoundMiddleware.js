import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';

const notFoundMiddleware = (req, res) => {
  res
    .status(HTTP_STATUS_CODES.NOT_FOUND)
    .json({
      status: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Route not found'
    });
};

export default notFoundMiddleware;