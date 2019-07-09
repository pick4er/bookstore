
export default {
  ADD_BOOKS({ commit, state }, { booksCount }) {
    const booksCountNum = Number(booksCount);
    if (isNaN(booksCountNum)) {
      return;
    }

    commit({
      type: 'ADD_BOOKS',
      booksCount: booksCountNum,
    });
  },
};
