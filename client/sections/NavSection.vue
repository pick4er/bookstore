<template>
  <ul :class="$style.list">
    <li>
      <base-link 
        v-if="isAuthed && isAdmin"
        isRouter 
        to="/admin"
        target="_self"
        :modes="['accent']" 
      >Панель администратора</base-link>
      
      <div v-else-if="isAuthed">
        <base-link
          isRouter
          :to="`/user/${userRouteName}/edit`"
          target="self"
          :modes="['accent']"
        >{{ displayName }}</base-link>

        <span :class="$style.slash">
          /
        </span>

        <base-link 
          :modes="['accent']"
          @click="logout"
        >Выйти</base-link>
      </div>

      <div v-else>
        <base-link 
          :modes="['accent']"
          @click="openRegisterModal"
        >Зарегистрироваться</base-link>

        <span :class="$style.slash">
          /
        </span>

        <base-link 
          :modes="['accent']"
          @click="openLoginModal"
        >Войти</base-link>
      </div>
    </li>
    <li>
      <div>
        <template v-if="isAdmin">
          <base-link
            isRouter
            :to="`/user/${userRouteName}/edit`"
            target="self"
            :modes="['accent']"
          >{{ displayName }}</base-link>

          <span :class="$style.slash">
            /
          </span>

          <base-link 
            :modes="['accent']"
            @click="logout"
          >Выйти</base-link>
        </template>

        <base-link 
          isRouter
          to="/cart"
          target="_self"
          :modes="['accent', 'adjacentLeft']" 
        >В корзине: {{ booksCount }} книг</base-link>
      </div>
    </li>
  </ul>
</template>

<script>
  import BaseLink from 'client/elements/BaseLink';
  import { ADMIN_MODE } from 'helpers/constants';
  import api from 'api';

  export default {
    name: 'nav-section',
    components: {
      'base-link': BaseLink,
    },
    computed: {
      booksCount() {
        return this.$store.getters.booksCount;
      },
      isAuthed() {
        return this.$store.state.isAuthed;
      },
      isAdmin() {
        return this.$store.state.userMode === ADMIN_MODE;
      },
      displayName() {
        return this.$store.getters.userDisplayName;
      },
      userRouteName() {
        return this.$store.getters.userRouteName;
      },
    },
    methods: {
      openRegisterModal() {
        this.$store.commit({
          type: 'OPEN_REGISTER_MODAL',
        });
      },
      openLoginModal() {
        this.$store.commit({
          type: 'OPEN_LOGIN_MODAL',
        });
      },
      async logout() {
        await api('logout', {
          method: 'POST',
          credentials: 'include',
        }).catch(console.error);

        this.$store.commit({
          type: 'UPDATE_IS_AUTHED',
          isAuthed: false,
        });
        this.$store.commit({
          type: 'UPDATE_USER_MODE',
          userMode: '',
        });
        this.$store.commit({
          type: 'FORGET_USER',
          user: {},
        });

        return;
      },
    }
  }
</script>

<style lang="stylus" module>
  .list
    flexBetween()
    height x(24)
    padding x(0)
    margin x(0)
    list-style none

  .slash
    accentFont()
    text-decoration none
    margin-left x(3)
    margin-right @margin-left
</style>
