const COLORS = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  RED_BG: '\x1b[41m',
  YELLOW: '\x1b[33m',
  WHITE: '\x1b[37m',
  BLUE: '\x1b[34;4m',
};

class PrettyError {
  static format(error) {
  
    if (!error.stack) {
      console.error(`${COLORS.RED}Error: ${error.message}${COLORS.RESET}`);
      return;
    }

    console.error(`${COLORS.RED}Error: ${error.message}${COLORS.RESET}`);
    console.error(`${COLORS.RED_BG}Code: ${error.code}${COLORS.RESET}`);
    console.error(`${COLORS.YELLOW}Stack Trace:${COLORS.RESET}`);

    const formattedStack = error.stack.split('\n').map((line) => {
      if (line.includes('node_modules')) {
        return `${COLORS.WHITE}${line}${COLORS.RESET}`;
      }

      const regex = /(\()(.*?)(\:(\d+)\:(\d+))/;
      const match = line.match(regex);

      if (match) {
        const [fullMatch, openParenthesis, path, location, lineNum, columnNum] = match;
        return line.replace(regex, `${openParenthesis}${COLORS.BLUE}${path}${COLORS.RESET}:${COLORS.YELLOW}${location}${COLORS.RESET}`);
      }

      return line;
    }).join('\n');

    console.error(formattedStack);
  }
}

export default PrettyError;

// PrettyError.format(error);