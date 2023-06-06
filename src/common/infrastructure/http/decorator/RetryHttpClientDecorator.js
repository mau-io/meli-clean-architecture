class DelayStrategy {
  getDelay(attempt, baseDelay = 1000) {
    throw new Error('Not implemented');
  }
}

class IncrementalDelayStrategy extends DelayStrategy {
  getDelay(attempt, baseDelay = 500) {
    return baseDelay * attempt;
  }
}

class ExponentialDelayStrategy extends DelayStrategy {
  getDelay(attempt, baseDelay = 500) {
    return baseDelay * 2 ** (attempt - 1);
  }
}

class RetryCondition {
  shouldRetry(error) {
    throw new Error('Not implemented');
  }
}

class AlwaysRetryCondition extends RetryCondition {
  shouldRetry(error) {
    return true;
  }
}

class ServerErrorRetryCondition extends RetryCondition {
  shouldRetry(error) {
    if(!error?.response?.status) return true;
    return error.response.status >= 500;
  }
}

class RetryHttpClientDecorator {
  constructor(httpClient, logger, options = {}) {
    this.httpClient = httpClient;
    this.logger = logger || console;
    this.retries = options.retries || 2;
    this.delayStrategy = options.delayStrategy || new IncrementalDelayStrategy();
    this.retryCondition = options.retryCondition || new ServerErrorRetryCondition();
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async executeRequest(method, ...args) {
    for (let attempt = 1;attempt <= this.retries;attempt++) {
      try {
        const response = await this.httpClient[method](...args);
        this.logger.debug(`[RetryHttpClient] SUCCESS on ${method.toUpperCase()} request - Attempt: ${attempt}`);
        return response;
      } catch (error) {
        this.logger.error(`[RetryHttpClient] ERROR on ${method.toUpperCase()} request - Attempt: ${attempt}, Error Message: ${error.message}`);
  
        if(
          this.retryCondition.shouldRetry(error) &&
          attempt < this.retries
        ) {
          const delay = this.delayStrategy.getDelay(attempt);
          this.logger.debug(`[RetryHttpClient] RETRYING in ${delay}ms.`);
          await this.delay(delay);
        } else {
          this.logger.error(`[RetryHttpClient] FAILURE after ${attempt} attempts.`);
          throw error;
        }
      }
    }
  }
  
  request(config) {
    return this.executeRequest('request', config);
  }

  get(url, config = {}) {
    return this.executeRequest('get', url, config);
  }

  post(url, data = {}, config = {}) {
    return this.executeRequest('post', url, data, config);
  }

  put(url, data = {}, config = {}) {
    return this.executeRequest('put', url, data, config);
  }

  patch(url, data = {}, config = {}) {
    return this.executeRequest('patch', url, data, config);
  }

  delete(url, config = {}) {
    return this.executeRequest('delete', url, config);
  }
}



export default RetryHttpClientDecorator;