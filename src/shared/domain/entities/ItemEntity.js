/**
 * Represents an item in your application.
 * @class
 */
class ItemEntity {
  /**
   * Creates a new ItemEntity instance.
   * @param {Object} item - The item object.
   * @param {string} item.id - The unique identifier of the item.
   * @param {string} item.title - The title of the item.
   * @param {number} item.price - The price of the item.
   * @param {string} item.picture - The URL of the item's picture.
   * @param {string} item.condition - The condition of the item.
   * @param {boolean} item.freeShipping - Whether or not the item ships for free.
   * @param {number} [item.soldQuantity] - The quantity of the item sold. Optional.
   * @param {string} [item.description] - A description of the item. Optional.
   */
  constructor({id, title, price, picture, condition, freeShipping, soldQuantity, description}) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = freeShipping;

    if (soldQuantity !== undefined) this.sold_quantity = soldQuantity;
    if (description !== undefined) this.description = description;
  }
}

export default ItemEntity;