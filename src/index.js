/**
 * Configuration
 */
import {MELI_SERVICE, PROJECT} from '#src/config/index.js';

/**
 * Common
 */
import CachingDataRepositoryDecorator from '#src/shared/infrastructure/repositories/decorator/CachingDataRepositoryDecorator.js';
import ParameterValidator from '#src/shared/infrastructure/utils/ParameterValidator.js';
import FetchHttpClient from '#src/common/infrastructure/http/FetchHttpClient.js';

import LoggingHttpClientDecorator from '#src/common/infrastructure/http/decorator/LoggingHttpClientDecorator.js';
import RetryHttpClientDecorator from '#src/common/infrastructure/http/decorator/RetryHttpClientDecorator.js';

import InMemoryCacheStrategy from '#src/common/infrastructure/cache/InMemoryCacheStrategy.js';
import ConsoleLoggerStrategy from '#src/common/infrastructure/logger/ConsoleLoggerStrategy.js';

/**
 * Express Server
 */
import ExpressServer from '#src/shared/infrastructure/framework_drivers/express/ExpressServer.js';

/**
 * Express Middlewares
 */
import loggingMiddleware from '#src/shared/infrastructure/framework_drivers/express/midlewares/loggingMiddleware.js';
import validateAuthToken from '#src/shared/infrastructure/framework_drivers/express/midlewares/validateAuthTokenMiddleware.js';
import extendedTokenValidation from '#src/shared/infrastructure/framework_drivers/express/midlewares/extendedValidateAuthTokenMiddleware.js';

/**
 * Contexts
 */
const httpClientRetries = 5;
import * as SearchContext from '#src/contexts/search/index.js';
import * as ItemsContext from '#src/contexts/items/index.js';

const validator = new ParameterValidator().parameter;
const logger = new ConsoleLoggerStrategy(PROJECT);
const cache = new InMemoryCacheStrategy();

let httpClient = new FetchHttpClient();
httpClient = new LoggingHttpClientDecorator(httpClient, logger);
httpClient = new RetryHttpClientDecorator(httpClient, logger, httpClientRetries);

// Initialize your repos here
let externalResourceDataRepository = new SearchContext.ExternalResourceDataRepository(
  httpClient,
  MELI_SERVICE
);

// Decorator
externalResourceDataRepository = new CachingDataRepositoryDecorator(
  externalResourceDataRepository,
  cache,
  logger,
  MELI_SERVICE.searchCacheTTL
);

let itemsExternalResourceDataRepository = new ItemsContext.ExternalResourceDataRepository(
  httpClient,
  MELI_SERVICE
);

itemsExternalResourceDataRepository = new CachingDataRepositoryDecorator(
  itemsExternalResourceDataRepository,
  cache,
  logger,
  MELI_SERVICE.itemsCacheTTL
);

// Initialize your use cases here
const searchItemsUseCase = new SearchContext.SearchItemsUseCase({
  fakeDataRepository: new SearchContext.FakeDataRepository(),
  externalResourceDataRepository 
});

const getItemsUseCase = new ItemsContext.GetItemsUseCase({
  fakeDataRepository: new ItemsContext.FakeDataRepository(),
  externalResourceDataRepository: itemsExternalResourceDataRepository
});

// Initialize your controllers here, passing the use cases they depend on
const appSearchController = new SearchContext.AppSearchController(
  searchItemsUseCase,
  validator,
  MELI_SERVICE
);

const appItemsController = new ItemsContext.AppItemsController(
  getItemsUseCase,
  validator
);

const searchController = new SearchContext.ExpressSearchController(appSearchController, logger);
const itemsController = new ItemsContext.ExpressItemsController(appItemsController, logger);

// Create your routes here, passing the controllers they depend on
const searchRoutes = new SearchContext.SearchRoutes(searchController);
const itemsRoutes = new ItemsContext.ItemsRoutes(itemsController);

// middlewares 
const middlewares = [
  new loggingMiddleware()
    .setLogger(logger)
    .getMiddleware,
  validateAuthToken, 
  extendedTokenValidation
];

// Export the server application without listening
export const app = new ExpressServer([
  searchRoutes,
  itemsRoutes
], middlewares);