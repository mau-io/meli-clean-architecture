import HTTP_STATUS_CODES from '#src/shared/infrastructure/constants/httpStatusCodes.js';
import ApplicationError from '#src/common/infrastructure/errors/ApplicationError.js';
import {MELI_SERVICE} from '#src/config/index.js';
const AUTH_TOKEN_HEADER = 'x-auth-token';

const validateAuthToken = (req, res, next) => {

  const authToken = req.headers[AUTH_TOKEN_HEADER];
  
  try {
    let sourceName = '';
    if (authToken === MELI_SERVICE.token) {
      sourceName = 'externalResourceDataRepository';
    } 
    else if(authToken === MELI_SERVICE.fakeToken) {
      sourceName = 'fakeDataRepository';
    }
    else {
      const errorMessage = `Invalid token: ${authToken}`;
      throw new ApplicationError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        errorMessage
      );
    }
    req.sourceName = sourceName;
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
