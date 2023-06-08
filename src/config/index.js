const { env } = process;
import getLocalIP from '#src/common/infrastructure/lib/getLocalIP.js';
import '#src/config/setEnv.js';

export const PROJECT = {
  name: env.PROJECT_NAME || 'MeLi',
  environment: env.ENVIRONMENT || 'development', // 'production'
  version: env.PROJECT_VERSION || '0.0.0',
  instanceId: process.env.INSTANCE_ID || `default-${getLocalIP()}`,
};

export const SERVER = {
  hostname: env.SERVER_HOSTNAME || 'localhost',
  port: parseInt(env.SERVER_PORT, 10) || 3030,
};

export const MELI_SERVICE = {
  url: env.MELI_SERVICE_URL || 'https://api.mercadolibre.com',
  token: env.MELI_SERVICE_TOKEN || '',
  fakeToken: env.MELI_SERVICE_FAKE_TOKEN || '',
  availableSites: ['MLA', 'MLB', 'MLM'],
  httpClientTimeout: parseInt(env.MELI_SERVICE_TIMEOUT, 10) || 3500, // timeout ms
  itemsCacheTTL: parseInt(env.MELI_SERVICE_ITEMS_CACHE_TTL, 10) || 1000 * 60 * 1, // ms (ms * sec * min)
  searchCacheTTL: parseInt(env.MELI_SERVICE_SEARCH_CACHE_TTL, 10) || 1000 * 60 * 1, // ms (ms * sec * min)
};
