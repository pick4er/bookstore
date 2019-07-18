import Vue from 'vue';
import Vuex from 'vuex';

import actions from 'client/flux/actions';
import getters from 'client/flux/getters';
import mutations from 'client/flux/mutations';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: () => ({
      order: {},
      books: [],
      error: null,
      isAuth: false,
      isAdminModalOpened: false,
    }),
    actions,
    getters,
    mutations,
  });
}