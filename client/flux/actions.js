import api from 'api';
import { ADMIN_MODE } from 'helpers/constants';

async function API(context = {}, data = {}) {
  const { commit, dispatch } = context;
  const {
    url,
    method,
    isAuth = true,
    headers,
    body,
    onError,
    onSuccess,
    ...rest
  } = data;

  let isError = false;
  const response = await api(url, {
    method: method || 'POST',
    credentials: isAuth ? 'include' : 'omit',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: {
      ...body,
    },
    ...rest
  }).catch(error => {
    isError = true;
    console.error(error);
    commit({
      type: 'UPDATE_ERROR',
      error,
    });
  });

  if (response.status === 'error') {
    onError && onError(response.message);
    isError = true;
  } else if (response.status === 'ok') {
    onSuccess && onSuccess(response.message);
  }

  return Promise.resolve({ isError, response });
}

export default {
  async UPDATE_BOOK(context, { book, onSuccess, onError }) {
    const { dispatch } = context;

    const { isError, response } = await API(context, {
      onError,
      onSuccess,
      url: 'update_book',
      method: 'PATCH',
      body: book,
    });
    if (isError) return;

    dispatch({ type: 'FETCH_BOOKS' });
  },

  async UPDATE_AUTHOR(context, { author, onSuccess, onError }) {
    const { dispatch } = context;

    const { isError, response } = await API(context, {
      onError,
      onSuccess,
      url: 'update_author',
      method: 'PATCH',
      body: {
        author_id: author.author_id,
        first_name: author.name,
        last_name: author.surname,
        middle_name: author.middleName,
      },
    });
    if (isError) return;

    dispatch({ type: 'FETCH_AUTHORS' });
    dispatch({ type: 'FETCH_BOOKS' });
  },

  async KEEP_BOOK(context, { book_id, qty, onSuccess, onError }) {
    const { dispatch } = context;

    const { isError, response } = await API(context, {
      onError,
      onSuccess,
      url: 'keep_book',
      body: {
        book_id,
        qty,
      },
    });
    if (isError) return;

    dispatch({ type: 'FETCH_BOOKS' });
  },

  async ADD_BOOK(context, { title, price, authors, onSuccess, onError }) {
    const { isError, response } = await API(context, {
      onError,
      onSuccess,
      url: 'add_book',
      title,
      price,
      authors,
    });
  },

  async ADD_AUTHOR(context, { author, onSuccess, onError }) {
    await API(context, {
      onError,
      onSuccess,
      url: 'add_author',
      body: {
        last_name: author.surname,
        first_name: author.name,
        middle_name: author.middleName,
      },
    });
  },

  async CHANGE_USER(context, { user, onSuccess, onError }) {
    const { 
      commit, 
      state: {
        user: {
          user_id,
          billing_id,
        } = {},
      } = {},
    } = context

    const { isError, response } = await API(context, {
      onError,
      onSuccess,
      url: 'user',
      method: 'PATCH',
      body: {
        user_id,
        billing_id,
        email: user.email,
        login: user.login,
        password: user.password,
        first_name: user.name,
        last_name: user.surname,
        middle_name: user.middleName,
        phone: user.phone,
        shipping_address: user.shippingAddress,        
      },
    });
    if (isError) return;

    commit({
      type: 'UPDATE_USER',
      user: response.user,
    });
  },

  async CREATE_ORDER(context, { onSuccess, onError }) {
    const { 
      commit, 
      state: {
        user: {
          user_id,
        } = {},
      } = {},
    } = context;

    const { isError, response } = await API(context, {
      onError,
      onSuccess,
      url: 'create_order',
      body: { user_id },
    });
    if (isError) return;

    commit({ type: 'CLEAR_CART' });
  },

  async REGISTER(context, { email, login, password, onError, onSuccess }) {
    const { commit, state } = context;

    const { isError, response } = await API(context, {
      onError,
      onSuccess,
      url: 'register',
      isAuth: false,
      body: { email, login, password },
    });
    if (isError) return;

    commit({ type: 'CLOSE_REGISTER_MODAL' });
  },

  async LOGIN(context, { email, password, onError, onSuccess }) {
    const { dispatch, commit, state } = context;

    const { isError, response } = await API(context, {
      onError,
      onSuccess,
      url: 'login',
      body: { email, password },
    });
    if (isError) return;

    commit({
      type: 'UPDATE_USER',
      user: response.user,
    });
    commit({
      type: 'UPDATE_IS_AUTHED', 
      isAuthed: true,
    });

    if (response.user.login === 'pick4er') {
      commit({
        type: 'UPDATE_USER_MODE', 
        userMode: ADMIN_MODE,
      });
    }

    commit({ type: 'CLOSE_LOGIN_MODAL' });
    dispatch({ type: 'FETCH_CART' });
  },

  async LOGOUT(context) {
    const { commit, state } = context;

    const { isError, response } = await API(context, {
      url: 'logout',
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
    commit({ type: 'CLEAR_CART' });
  },

  async CHECK_IF_AUTHED(context) {
    const { 
      dispatch, 
      commit, 
      state: {
        isAuthed, cart,
      } = {},
    } = context;
    if (isAuthed) return;

    const { isError, response } = await API(context, {
      method: 'GET',
      url: 'is_authenticated',
      json: true,
    });
    if (isError) return;

    if (response.status === 'unauthorized') {
      commit({
        type: 'UPDATE_IS_AUTHED',
        isAuthed: false,
      });

      return;
    }

    const { user } = response;

    commit({
      type: 'UPDATE_IS_AUTHED',
      isAuthed: true,
    });
    commit({
      type: 'UPDATE_USER',
      user,
    });

    (cart.length === 0) && 
    dispatch({ type: 'FETCH_CART' });

    (user.login === 'pick4er') &&
    commit({
      type: 'UPDATE_USER_MODE', 
      userMode: ADMIN_MODE,
    });
  },

  async FETCH_BOOK(context, { bookId }) {
    const { commit } = context;

    const { isError, response } = await API(context, {
      method: 'GET',
      url: `book/?book_id=${bookId}`,
      isAuth: false,
      json: true,
    });
    if (isError) return;

    commit({
      type: 'UPDATE_BOOK',
      book: response.book,
    });
  },

  async FETCH_BOOKS(context) {
    const { commit } = context;

    const { isError, response } = await API(context, {
      url: 'books',
      method: 'GET',
      isAuth: false,
    });
    if (isError) return;

    commit({
      type: 'UPDATE_BOOKS',
      books: response.books || [],
    });
  },

  async FETCH_AUTHORS(context) {
    const { commit } = context;

    const { isError, response } = await API(context, {
      url: 'authors',
      method: 'GET',
    });
    if (isError) return;

    commit({
      type: 'UPDATE_AUTHORS',
      authors: response.authors || [],
    });
  },

  async FETCH_CART(context) {
    const { 
      commit, 
      state: {
        user: {
          user_id,
        } = {},
      } = {},
    } = context;

    const url = `get_cart/?user_id=${user_id}`;

    const { isError, response } = await API(context, {
      url,
      method: 'GET',
    });
    if (isError) return;

    commit({
      type: 'UPDATE_CART',
      cart: response.cart || [],
    });
  },

  async ORDER_BOOK(context, { book_id, count }) {
    const { 
      commit, 
      dispatch, 
      state: {
        isAuthed,
        user: {
          user_id,
        } = {},
      } = {},
    } = context;

    if (!isAuthed) {
      alert(`
Авторизуйтесь, пожалуйста.\

Например:\

- Email: pick4er@gmail.com\

- Пароль: 12345\
      `);
      return;
    }

    const { isError, response } = await API(context, {
      method: 'PATCH',
      url: 'update_cart',
      body: {
        user_id,
        book_id,
        qty: count,        
      },
    });
    if (isError) return;

    dispatch({ type: 'FETCH_CART' });
  },
};
