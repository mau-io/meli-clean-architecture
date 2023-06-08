// Repositories
export { default as ExternalResourceDataRepository } from '#src/contexts/items/infrastructure/repositories/ExternalResourceDataRepository.js';
export { default as FakeDataRepository } from '#src/contexts/items/infrastructure/repositories/FakeDataRepository.js';

// Use Case
export { default as GetItemsUseCase } from '#src/contexts/items/application/use_cases/GetItemsUseCase.js';

// Controllers
export { default as AppItemsController } from '#src/contexts/items/application/controllers/AppItemsController.js';
export { default as ExpressItemsController } from '#src/contexts/items/infrastructure/adapters/express/controllers/ExpressItemsController.js';

// Routes
export { default as ItemsRoutes } from '#src/contexts/items/infrastructure/adapters/express/ItemsRoutes.js';
