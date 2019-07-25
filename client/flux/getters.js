import sanitizeUserFromServer from 'helpers/sanitizeUserFromServer';

export default {
  booksCount(state) {
    const { order } = state;
    const count = Object.keys(order).reduce((acc, book_id) => (
      acc + order[book_id].count
    ), 0);

    return count;
  },
  sanitizedUser(state) {
    const { user } = state;
    return sanitizeUserFromServer(user);
  },
  userDisplayName(state, getters) {
    const {
      sanitizedUser: {
        name,
        surname,
        middleName,
        login,
        email,
      } = {},
    } = getters;

    let displayName = email;
    if (name) {
      displayName = name;
      if (surname) {
        displayName += ` ${surname}`;
      }
    } else if (login) {
      displayName = login;
    }

    return displayName;
  },
  userRouteName(state, getters) {
    const {
      sanitizedUser: {
        login,
        userId,
      } = {},
    } = getters;

    if (login) {
      return login;
    }

    return userId;
  },
};
