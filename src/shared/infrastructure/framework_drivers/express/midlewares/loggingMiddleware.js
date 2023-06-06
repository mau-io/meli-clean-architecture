const generateRandomID = () => {
  return Math.floor(Math.random() * Date.now()).toString();
};

class LoggingMiddleware {
  constructor(logger) {
    this.logger = logger || console;
    this.getMiddleware = this.getMiddleware.bind(this);
  }

  getMiddleware(req, res, next) {
    const { json } = res;
    let responseBody;

    const requestId = req.headers['x-request-id'] || generateRandomID();

    res.setHeader('X-Request-ID', requestId);

    res.json = (body) => {
      responseBody = body;
      //this.logger.info(`Response json Body: ${JSON.stringify(body, null, 4)}`);
      return json.call(res, body);
    };

    const { method, url, headers, query, body } = req;
    const ip = req.ip || req.connection.remoteAddress;

    const requestLog = {
      method,
      url,
      headers,
      query,
      //body: (['POST', 'PUT', 'PATCH'].includes(method)) ? body : undefined,
      ip,
      requestId,  // Logea el requestId
    };

    this.logger.info({
      title: '[LoggingMiddleware] Incoming request',
      data: requestLog
    });

    res.on('finish', () => {
      const responseLog = {
        status: res.statusCode,
        headers: res.getHeaders(),
        //body: responseBody,
        requestId,  // Logea el requestId
      };

      this.logger.info({
        title: '[LoggingMiddleware] Response sent',
        data: responseLog
      });
    });

    next();
  }

  setLogger(logger) {
    this.logger = logger;
    return this;
  }
}

export default LoggingMiddleware;
