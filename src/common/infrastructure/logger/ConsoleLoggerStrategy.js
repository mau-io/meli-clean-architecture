import AbstractLoggerStrategy from '#src/common/infrastructure/logger/AbstractLoggerStrategy.js';

const COLORS = {
  RESET: '\x1b[0m',
  INFO: '\x1b[36m', // Cyan
  WARNING: '\x1b[33m', // Yellow
  ERROR: '\x1b[31m', // Red
  VERBOSE: '\x1b[32m', // Green
  DEBUG: '\x1b[35m', // Magenta
  DATE: '\x1b[37m' // White
};

class ConsoleLoggerStrategy extends AbstractLoggerStrategy {
  constructor(project = {}) {
    super();
    this.project = project;
  }

  getMessage(message, level) {
    const { name = '', environment = '', version = '', instanceId = '' } = this.project;

    const timestamp = new Date().toISOString();
   
    const projectInfo = {
      project: name,
      version: version,
      environment: environment,
      instanceId: instanceId,
    };

    const logObject = {
      level: level,
      msg: message,
      time: timestamp,
      projectInfo: projectInfo,
    };

    return `${COLORS[level]}${JSON.stringify(logObject, null, 2)}${COLORS.RESET}`;
  }

  info(message) {
    console.log(this.getMessage(message, 'INFO'));
  }

  warn(message) {
    console.warn(this.getMessage(message, 'WARNING'));
  }

  error(message) {
    console.error(this.getMessage(message, 'ERROR'));
  }

  verbose(message) {
    console.log(this.getMessage(message, 'VERBOSE'));
  }

  debug(message) {
    console.debug(this.getMessage(message, 'DEBUG'));
  }
}


export default ConsoleLoggerStrategy;
