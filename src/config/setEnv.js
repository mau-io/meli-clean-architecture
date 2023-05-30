import fs from 'fs';
import os from 'os';

if (fs.existsSync('.env')) {
  const envConfig = fs.readFileSync('.env', 'utf8');
  const lines = envConfig.split(os.EOL);
  for (const line of lines) {
    if (line) {
      const [key, value] = line.split('=');
      process.env[key] = value;
    }
  }
} else {
  console.log('\x1b[31m[.env file does not exist]\x1b[0m');
}
