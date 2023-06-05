import { Router } from 'express';

class ItemsRoutes {
  constructor(itemsController) {
    this.router = Router();
    this.router.get('/api/v1/items/:id', (req, res) => itemsController.handleGetItem(req, res));
  }
}

export default ItemsRoutes;