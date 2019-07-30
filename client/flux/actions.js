import api from 'api';

import { ADMIN_MODE } from 'helpers/constants';

export default {
  async CREATE_ORDER({ commit, state }, { onSuccess, onError }) {
    const { user: { user_id } = {} } = state;

    let isError = false;
    const response = await api('create_order', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        user_id,
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
      commit({
        type: 'UPDATE_ERROR',
        error: response.message,
      });
      onError(response.message);

      return;
    }

    commit({
      type: 'CLEAR_CART',
    });
    onSuccess(response.message);
  },
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
    const url = `get_cart/?user_id=${user_id}`;

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

  async ORDER_BOOK({ commit, dispatch, state }, { book_id, count }) {
    const { user: { user_id } = {}, isAuthed, } = state;

    if (!isAuthed) {
      alert(`
Авторизуйтесь, пожалуйста.\

Например:\

- Email: pick4er@gmail.com\

- Пароль: 12345\
      `);
      return;
    }

    let isError = false;
    const result = await api('update_cart', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        user_id,
        book_id,
        qty: count,
      },
    }).catch(error => {
      isError = true;
      console.error(error);
      commit({
        type: 'UPDATE_ERROR',
        error,
      });
    })
    if (isError) return;

    if (result.status !== 'ok') {
      commit({
        type: 'UPDATE_ERROR',
        error: result.message,
      });

      return;
    }

    if (result.status === 'ok') {
      dispatch({
        type: 'FETCH_CART',
      });
    }
  },
};
