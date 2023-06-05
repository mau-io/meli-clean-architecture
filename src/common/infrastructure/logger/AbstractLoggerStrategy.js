class AbstractLoggerStrategy {
  info(message) {
    throw new Error("Method 'info()' must be implemented.");
  }

  warn(message) {
    throw new Error("Method 'warn()' must be implemented.");
  }

  error(message) {
    throw new Error("Method 'error()' must be implemented.");
  }

  verbose(message) {
    throw new Error("Method 'message()' must be implemented.");
  }

  debug(message) {
    throw new Error("Method 'debug()' must be implemented.");
  }
}

export default AbstractLoggerStrategy;
