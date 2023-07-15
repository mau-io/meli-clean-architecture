import { Router } from 'express';

class ItemsRoutes {
  constructor(itemsController) {
    this.router = Router();
    this.router.get('/api/v1/items/:id', (req, res, next) => itemsController.handleGetItem(req, res, next));
  }
}

export default ItemsRoutes;