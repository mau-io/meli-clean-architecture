const { env } = process;
import '#src/config/setEnv.js';

export const PROJECT = {
  name: env.PROJECT_NAME || 'MeLi',
  environment: env.ENVIRONMENT || 'development', // 'production'
  version: env.PROJECT_VERSION || '0.0.0',
  instanceId: process.env.INSTANCE_ID
};

export const SERVER = {
  hostname: env.SERVER_HOSTNAME || 'localhost',
  port: parseInt(env.SERVER_PORT, 10) || 3030,
};

export const MELI_SERVICE = {
  url: env.MELI_SERVICE_URL || 'https://api.mercadolibre.com',
  token: env.MELI_SERVICE_TOKEN || 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc',
  fakeToken: env.MELI_SERVICE_FAKE_TOKEN || '55a4639f-55e8-4e14-a6cc-b79977b20a4e',
  availableSites: ['MLA', 'MLB', 'MLM']
};
