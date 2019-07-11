
export default {
  booksCount(state) {
    const { order } = state;
    const count = Object.keys(order).reduce((acc, book_id) => (
      acc + order[book_id].count
    ), 0);

    return count;
  },
};
