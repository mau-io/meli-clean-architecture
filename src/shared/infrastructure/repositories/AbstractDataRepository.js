/**
 * AbstractDataRepository repository using the Repository pattern
 * @interface
 */
class AbstractDataRepository {
  read(query, options) {
    throw new Error('This method must be overridden');
  }
}

export default AbstractDataRepository;