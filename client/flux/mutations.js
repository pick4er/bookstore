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
  UPDATE_AUTH(state, { isAuth }) {
    Vue.set(state, 'isAuth', isAuth);
  },
  OPEN_ADMIN_MODAL(state) {
    Vue.set(state, 'isAdminModalOpened', true);
  },
  CLOSE_ADMIN_MODAL(state) {
    Vue.set(state, 'isAdminModalOpened', false);
  }
};
