// Define the sorting criteria and comparison functions
const sortingCriteria = {
  price_asc: (a, b) => a.price.amount - b.price.amount,
  price_desc: (a, b) => b.price.amount - a.price.amount,
};

export const AVAILABLE_SORTS = Object.keys(sortingCriteria);

// Sort the items based on sortCriteria
export default function sortItemsByCriteria(items, sortCriteria) {
  if (sortingCriteria[sortCriteria]) {
    items.sort(sortingCriteria[sortCriteria]);
  }
}