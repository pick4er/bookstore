import Vue from 'vue';

export default {
  UPDATE_ERROR(state, { error }) {
    state.error = error;
  },
  UPDATE_BOOKS(state, { books }) {
    Vue.set(state, 'books', books);
  },
  ORDER_BOOK(state, { book }) {
    Vue.set(state.order, book.book_id, { ...book });
  },

  UPDATE_ORDER_COUNT(state, { key, incCount }) {
    const nextCount = (
      Number(state.order[key].count) +
      Number(incCount)
    );

    Vue.set(state.order[key], 'count', nextCount);
  },
};
