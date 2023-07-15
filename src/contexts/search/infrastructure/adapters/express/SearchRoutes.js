import { Router } from 'express';

class SearchRoutes {
  constructor(searchController) {
    this.router = Router();
    this.router.get('/api/v1/search', (req, res, next) => searchController.handleSearch(req, res, next));
  }
}

export default SearchRoutes;