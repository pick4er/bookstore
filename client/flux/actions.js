import api from 'api';

export default {
  async FETCH_BOOKS({ commit }) {
    let isError;
    const books = await api('books', {
      json: true,
    })
      .catch(error => {
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
