import { app } from '#src/index.js';
import { SERVER, PROJECT, MELI_SERVICE } from '#src/config/index.js';

app.listen(SERVER.port, (error) => {
  if (error) {
    console.error(`\x1b[31mFailed to start server: ${error.message}\x1b[0m`);
    process.exit(1);
  } else {
    console.log(`\x1b[32m[${PROJECT.name}-v${PROJECT.version} running in ${PROJECT.environment} mode]\x1b[0m`);
    console.log(`Server instance: \x1b[34m${PROJECT.instanceId}\x1b[0m`);
    console.log(`Server running at \x1b[36mhttp://${SERVER.hostname}:${SERVER.port}\x1b[0m`);

    if (PROJECT.environment === 'development') {
      const formatKey = (key) => `\x1b[33m${key}\x1b[0m`;
      console.log('');
      for(const key in MELI_SERVICE) {
        console.log(`${formatKey(key)}: ${MELI_SERVICE[key]}`);
      }
    }

  }
});