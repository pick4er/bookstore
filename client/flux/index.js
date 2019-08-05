import Vue from 'vue';
import Vuex from 'vuex';

import actions from 'client/flux/actions';
import getters from 'client/flux/getters';
import mutations from 'client/flux/mutations';

Vue.use(Vuex);

export default function createStore(initialState = {}) {
  return new Vuex.Store({
    state: () => ({
      isMobile: false,
      books: [],
      book: {},
      authors: [],
      cart: [],
      error: null,
      user: {},
      userMode: null,
      isAuthed: null,
      isLoginModalOpened: null,
      isRegisterModalOpened: null,
      ...initialState
    }),
    actions,
    getters,
    mutations,
  });
}