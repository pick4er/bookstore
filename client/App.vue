<template>
  <base-layout>
    <router-view />
    <login-modal 
      :isOpened="isLoginModalOpened" 
      :auth="auth"
      :close="closeLoginModal"
    />
    <register-modal
      :isOpened="isRegisterModalOpened"
      :register="register"
      :close="closeRegisterModal"
    />
  </base-layout>
</template>

<script>
  import BaseLayout from 'client/layouts/BaseLayout';
  import LoginModal from 'client/components/LoginModal';
  import RegisterModal from 'client/components/RegisterModal';

  import { ADMIN_MODE } from 'helpers/constants';

  import api from 'api';

  export default {
    name: 'App',
    components: {
      'base-layout': BaseLayout,
      'login-modal': LoginModal,
      'register-modal': RegisterModal,
    },
    async beforeMount() {
      await this.isAuthenticated()
        .catch(console.error);
    },
    computed: {
      isLoginModalOpened() {
        return Boolean(this.$store.state.isLoginModalOpened);
      },
      isRegisterModalOpened() {
        return Boolean(this.$store.state.isRegisterModalOpened);
      }
    },
    methods: {
      // same as in elements/BaseLink.vue
      async isAuthenticated() {
        const { 
          state: { isAuthed = false } = {},
        } = this.$store;

        if (isAuthed) return Promise.resolve(true);

        let isError = false;
        const response = await api('is_authenticated', {
          credentials: 'include',
        }).catch(e => {
          console.error(e);
          isError = true;
        });
        if (isError) return;

        if (response.status === 'ok') {
          this.$store.commit({
            type: 'UPDATE_IS_AUTHED',
            isAuthed: true,
          })
          return Promise.resolve(true);
        }

        this.$store.commit({
          type: 'UPDATE_IS_AUTHED',
          isAuthed: false,
        });
        return Promise.reject(false);
      },
      auth() {
        this.$store.commit({
          type: 'UPDATE_IS_AUTHED', 
          isAuthed: true,
        });
        this.$store.commit({
          type: 'UPDATE_USER_MODE', 
          userMode: ADMIN_MODE,
        });
        this.$store.commit({
          type: 'CLOSE_LOGIN_MODAL',
        });
      },
      register() {
        return;
      },
      closeLoginModal() {
        this.$store.commit({
          type: 'CLOSE_LOGIN_MODAL',
        });
      },
      closeRegisterModal() {
        this.$store.commit({
          type: 'CLOSE_REGISTER_MODAL',
        });
      }
    },
  }
</script>

<style lang="stylus" module>
</style>
