import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';
import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
const AUTH_TOKEN_HEADER = 'x-auth-token';

// UUID format validator
const validateTokenFormat = (token) => {
  const tokenRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  return tokenRegex.test(token);
};

// Middleware para validar el token x-auth-token
const validateAuthToken = (req, res, next) => {
  const authToken = req.headers[AUTH_TOKEN_HEADER];

  try {
    if (
      !validateTokenFormat(authToken)
    ) {
      let errorMessage = `Invalid ${AUTH_TOKEN_HEADER} format`;

      if (!authToken) errorMessage = `Missing ${AUTH_TOKEN_HEADER}`;

      throw new ApplicationError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        errorMessage
      );
    }
  
    next();
  } catch(error) {
    if (error instanceof ApplicationError) {
      res
        .status(error.status)
        .json(error);
    } else {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: error.message
        });
    }
  }
};


export default validateAuthToken;
