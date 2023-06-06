class LoggingHttpClientDecorator {
  constructor(httpClient, logger) {
    this.httpClient = httpClient;
    this.logger = logger;
    // Return a Proxy to intercept all method calls
    return new Proxy(this.httpClient, {
      get: (target, prop) => {
        // Check if the property is a function
        if (typeof target[prop] === 'function') {
          return async(...args) => {
            // Log the request
            this.logger.info({
              title: `[LoggingHttpClient] Outgoing request ${prop.toLocaleUpperCase()} params`,
              data: args
            });
            
            // Make the actual request
            const response = await target[prop](...args);
            
            // Log the response
            this.logger.info({
              title: '[LoggingHttpClient] Response Headers',
              data: response.headers
            });

            return response;
          };
        } else {
          // If the property is not a function, return it as is
          return target[prop];
        }
      }
    });
  }
}

export default LoggingHttpClientDecorator;