// Define the interface for cache strategies
class AbstractCacheStrategy {
  get(key) {
    throw new Error('This method must be overridden');
  }

  set(key, value) {
    throw new Error('This method must be overridden');
  }
}
export default AbstractCacheStrategy;