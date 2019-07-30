import api from 'api';

import { stringify } from 'query-string';
import { ADMIN_MODE } from 'helpers/constants';

export default {
  async REGISTER({ commit, state }, { email, login, password, onError }) {
    let isError = false;
    const response = await api('register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email,
        login,
        password,
      },
    }).catch(error => {
      isError = true;
      console.error(error);
      commit({
        type: 'UPDATE_ERROR',
        error,
      });
    });
    if (isError) return;

    if (response.status !== 'ok') {
      onError(response.message);
      return;
    }

    return commit({
      type: 'CLOSE_REGISTER_MODAL',
    });
  },

  async LOGIN({ dispatch, commit, state }, { email, password, onError }) {
    let isError = false;
    const response = await api('login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email,
        password,
      },
    }).catch(error => {
      console.error(error);
      isError = true
      commit({
        type: 'UPDATE_ERROR',
        error,
      });
    });
    if (isError) return;

    if (response.status !== 'ok') {
      onError(response.message);
      return;
    }

    commit({
      type: 'UPDATE_USER',
      user: response.user,
    });
    commit({
      type: 'UPDATE_IS_AUTHED', 
      isAuthed: true,
    });
    dispatch({
      type: 'FETCH_CART',
    });

    if (response.user.login === 'pick4er') {
      commit({
        type: 'UPDATE_USER_MODE', 
        userMode: ADMIN_MODE,
      });
    }

    commit({
      type: 'CLOSE_LOGIN_MODAL',
    });
  },

  async LOGOUT({ commit, state }) {
    let isError = false;
    await api('logout', {
      method: 'POST',
      credentials: 'include',
    }).catch(error => {
      isError = true;
      console.error(error);
      commit({
        type: 'UPDATE_ERROR',
        error,
      });
    });
    if (isError) return;

    commit({
      type: 'UPDATE_IS_AUTHED',
      isAuthed: false,
    });
    commit({
      type: 'UPDATE_USER_MODE',
      userMode: '',
    });
    commit({
      type: 'FORGET_USER',
      user: {},
    });
    commit({
      type: 'CLEAR_CART',
    });
  },

  async CHECK_IF_AUTHED({ dispatch, commit, state }) {
    const { isAuthed, cart } = state;
    if (isAuthed) return;

    let isError = false;
    const response = await api('is_authenticated', {
      credentials: 'include',
    }).catch(error => {
      isError = true;
      console.error(error);
      commit({
        type: 'UPDATE_ERROR',
        error,
      });
    });
    if (isError) return;

    if (response.status === 'ok') {
      const { user } = response;

      commit({
        type: 'UPDATE_IS_AUTHED',
        isAuthed: true,
      });
      commit({
        type: 'UPDATE_USER',
        user,
      });
      if (cart.length === 0) {
        dispatch({
          type: 'FETCH_CART',
        });
      }

      if (user.login === 'pick4er') {
        commit({
          type: 'UPDATE_USER_MODE', 
          userMode: ADMIN_MODE,
        });
      }

      return;
    }

    commit({
      type: 'UPDATE_IS_AUTHED',
      isAuthed: false,
    });
  },

  async FETCH_BOOKS({ commit }) {
    let isError;
    const books = await api('books', {
      json: true,
    }).catch(error => {
      isError = true,
      console.log(error);
      commit({
        error,
        type: 'UPDATE_ERROR',
      });
    });
    if (isError) return;

    commit({
      type: 'UPDATE_BOOKS',
      books: [...books],
    });
  },

  async FETCH_AUTHORS({ commit }) {
    let isError;
    const authors = await api('authors', {
      credentials: 'include',
    }).catch(error => {
      isError = true;
      console.error(error);
      commit({
        error,
        type: 'UPDATE_ERROR',
      });
    });
    if (isError) return;

    commit({
      type: 'UPDATE_AUTHORS',
      authors: [...authors],
    });
  },

  async FETCH_CART({ commit, state }) {
    const {
      user: {
        user_id,
      } = {},
    } = state;
    const url = `get_cart/?${stringify({ user_id })}`;

    let isError = false;
    const result = await api(url, {
      method: 'GET',
      credentials: 'include',
    }).catch(error => {
      isError = true;
      console.error(error);
      commit({
        error,
        type: 'UPDATE_ERROR',
      });
    });
    if (isError) return;

    if (result.status === 'error') {
      commit({
        error: result,
        type: 'UPDATE_ERROR',
      });

      return;
    }

    commit({
      type: 'UPDATE_CART',
      cart: [...result.cart],
    });
  },

  ORDER_BOOK({ commit, dispatch, state }, { book }) {
    if (state.order[book.book_id]) {
      dispatch({
        type: 'UPDATE_ORDER_COUNT',
        incCount: book.count,
        key: book.book_id,
      });
    } else {
      const countNum = Number(book.count);
      if (isNaN(countNum)) {
        return;
      }

      commit({
        type: 'ORDER_BOOK',
        book: {
          ...book,
          count: countNum,
        },
      });
    }
  },

  UPDATE_ORDER_COUNT({ commit, state }, { incCount, key }) {
    const incCountNum = Number(incCount);
    if (isNaN(incCountNum)) {
      return;
    }

    commit({
      type: 'UPDATE_ORDER_COUNT',
      incCount: incCountNum,
      key,
    });
  },
};
