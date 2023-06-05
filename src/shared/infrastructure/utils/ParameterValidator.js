import Parameter from 'parameter';

class ValidationStrategy {
  validate(rule, value) {
    throw new Error(`Method validate() must be implemented in ${this.constructor.name}.`);
  }
}

class LimitValidationStrategy extends ValidationStrategy {
  validate(rule, value) {
    const parsedLimit = parseInt(value, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 50) {
      return 'The "limit" parameter must be a positive integer not exceeding 50.';
    }
  }
}

class OffsetValidationStrategy extends ValidationStrategy {
  validate(rule, value) {
    const parsedOffset = parseInt(value, 10);
    if (isNaN(parsedOffset) || parsedOffset < 0 || parsedOffset > 100) {
      return 'The "offset" parameter must be a non-negative integer not exceeding 100.';
    }
  }
}

class MeliIdValidationStrategy extends ValidationStrategy {
  validate(rule, value) {
    // Checks if the value starts with "ML"
    if (!value.startsWith('ML')) {
      return 'The ID should start with [ML].';
    }

    // Checks if the third character is an uppercase letter
    if (!/[A-Z]/.test(value.charAt(2))) {
      return 'The third character of the ID should be an uppercase letter.';
    }

    // Checks if the last 10 characters are digits
    if (!/^\d{10}$/.test(value.substring(3))) {
      return 'The last 10 characters of the ID should be digits.';
    }

    // If the value passes all the checks, it's valid
    return null;
  }
}

class ParameterValidator {
  constructor() {
    this.parameter = new Parameter();
    this.addValidationStrategy('limit', new LimitValidationStrategy());
    this.addValidationStrategy('offset', new OffsetValidationStrategy());
    this.addValidationStrategy('meliId', new MeliIdValidationStrategy());
  }

  addValidationStrategy(ruleName, strategy) {
    if (!(strategy instanceof ValidationStrategy)) {
      throw new Error('Invalid validation strategy.');
    }

    this.parameter.addRule(ruleName, strategy.validate);
  }
}

export default ParameterValidator;
