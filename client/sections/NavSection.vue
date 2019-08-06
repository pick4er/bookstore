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
      
      <div 
        v-else-if="isAuthed"
        :class="$style.userBlock"
      >
        <base-link
          isRouter
          :to="`/user/${userRouteName}/edit`"
          target="self"
          :modes="['accent']"
          :linkClass="$style.userName"
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
    <li :class="$style.cartRow">
      <div :class="$style.userBlock">
        <template v-if="isAdmin">
          <base-link
            isRouter
            :to="`/user/${userRouteName}/edit`"
            target="self"
            :modes="['accent']"
            :linkClass="$style.userName"
          >{{ displayName }}</base-link>

          <span :class="$style.slash">
            /
          </span>

          <base-link 
            :modes="['accent']"
            @click="logout"
          >Выйти</base-link>
        </template>
      </div>

      <base-link 
        v-if="isAuthed"
        isRouter
        to="/cart"
        target="_self"
        :modes="['accent', 'adjacentLeft']" 
        :title="booksCount"
      >
        В корзине: 
        {{ booksCount | kkCount }} 
        {{ booksCount | pluralizeCount }}
      </base-link>
    </li>
  </ul>
</template>

<script>
  import BaseLink from 'client/elements/BaseLink';

  import { ADMIN_MODE } from 'helpers/constants';
  import pluralizeWord from 'helpers/pluralizeWord';
  import kkNumber from 'helpers/kkNumber';

  export default {
    name: 'nav-section',
    components: {
      'base-link': BaseLink,
    },
    computed: {
      booksCount() {
        return (this.$store.state.cart || []).length || 0;
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
    filters: {
      pluralizeCount(value) {
        return pluralizeWord('книг', ['а', 'и', ''], value);
      },
      kkCount(value) {
        return kkNumber(value);
      }
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
      logout() {
        this.$store.dispatch({
          type: 'LOGOUT',
        });
      },
    }
  }
</script>

<style lang="stylus" module>
  html[data-layout="mobile"]
    .list
      display flex
      flex-flow column-reverse
      align-items flex-end
      height auto
      padding x(6)

      li
        width 100%

    .cartRow
      flexBetween()
      margin-bottom x(2)

  .list
    flexBetween()
    height x(24)
    padding x(0)
    margin x(0)
    list-style none

    .cartRow
      display flex

  .userBlock
    display flex

    .userName
      textEllipsis()
      display block
      max-width x(200)

  .slash
    accentFont()
    text-decoration none
    margin-left x(3)
    margin-right @margin-left
</style>
