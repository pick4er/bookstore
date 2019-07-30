import sanitizeUserFromServer from 'helpers/sanitizeUserFromServer';

export default {
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
