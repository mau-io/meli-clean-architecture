import { Router } from 'express';

class SearchRoutes {
  constructor(searchController) {
    this.router = Router();
    this.router.get('/api/v1/search', (req, res) => searchController.handleSearch(req, res));
  }
}

export default SearchRoutes;