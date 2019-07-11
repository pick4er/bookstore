
export default {
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
