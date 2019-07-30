import Vue from 'vue';

export default {
  UPDATE_ERROR(state, { error }) {
    state.error = error;
  },
  UPDATE_BOOKS(state, { books }) {
    Vue.set(state, 'books', books);
  },
  UPDATE_AUTHORS(state, { authors }) {
    Vue.set(state, 'authors', authors);
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
  UPDATE_IS_AUTHED(state, { isAuthed }) {
    Vue.set(state, 'isAuthed', isAuthed);
  },
  OPEN_LOGIN_MODAL(state) {
    Vue.set(state, 'isLoginModalOpened', true);
  },
  CLOSE_LOGIN_MODAL(state) {
    Vue.set(state, 'isLoginModalOpened', false);
  },
  OPEN_REGISTER_MODAL(state) {
    Vue.set(state, 'isRegisterModalOpened', true);
  },
  CLOSE_REGISTER_MODAL(state) {
    Vue.set(state, 'isRegisterModalOpened', false);
  },
  UPDATE_USER_MODE(state, { userMode }) {
    Vue.set(state, 'userMode', userMode);
  },
  FORGET_USER(state) {
    Vue.set(state, 'user', {});
  },
  UPDATE_USER(state, { user }) {
    Vue.set(state, 'user', user);
  },
  UPDATE_CART(state, { cart }) {
    Vue.set(state, 'cart', cart);
  },
  CLEAR_CART(state) {
    Vue.set(state, 'cart', {});
  },
};
