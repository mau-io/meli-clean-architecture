import CacheStrategy from '#src/common/infrastructure/cache/AbstractCacheStrategy.js';

class InMemoryCacheStrategy extends CacheStrategy {
  constructor() {
    super();
    this.cache = new Map();
  }

  get(key) {
    const item = this.cache.get(key);
    
    if(!item) return null;

    return item.value;
  }

  set(key, value, ttl = 5000) {
    const item = {
      value: value,
      timeoutId: null,
    };
    
    if(ttl) {
      item.timeoutId = setTimeout(() => {
        this.cache.delete(key);
      }, ttl);
    }
    
    const oldItem = this.cache.get(key);

    if(oldItem && oldItem.timeoutId) {
      clearTimeout(oldItem.timeoutId);
    }

    this.cache.set(key, item);
  }
}

export default InMemoryCacheStrategy;