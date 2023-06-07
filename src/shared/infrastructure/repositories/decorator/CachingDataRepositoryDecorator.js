class CachingDataRepositoryDecorator {
  constructor(repository, cacheStrategy, logger, ttl) {
    this.repository = repository;
    this.cache = cacheStrategy;
    this.logger = logger || console;
    this.ttl = ttl;
  }

  async read(query, options = {}) {
    const cacheKey = JSON.stringify({
      query,
      ...options,
    });

    const cachedData = await this.cache.get(cacheKey);

    if (cachedData) {
      this.logger.debug(`[CachingDataRepository] Cache hit for key: ${cacheKey} (TTL: ${this.ttl}ms)`);
      return cachedData;
    }

    this.logger.debug(`[CachingDataRepository] Cache miss for key: ${cacheKey} (TTL: ${this.ttl}ms)`);
    const data = await this.repository.read(query, options);
    await this.cache.set(cacheKey, data, this.ttl);

    return data;
  }
}

export default CachingDataRepositoryDecorator;
