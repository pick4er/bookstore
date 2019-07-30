<template>
  <base-layout>
    <router-view />
    <login-modal :isOpened="isLoginModalOpened" />
    <register-modal :isOpened="isRegisterModalOpened" />
  </base-layout>
</template>

<script>
  import BaseLayout from 'client/layouts/BaseLayout';
  import LoginModal from 'client/components/LoginModal';
  import RegisterModal from 'client/components/RegisterModal';

  export default {
    name: 'App',
    components: {
      'base-layout': BaseLayout,
      'login-modal': LoginModal,
      'register-modal': RegisterModal,
    },
    beforeMount() {
      this.$store.dispatch({
        type: 'CHECK_IF_AUTHED',
      });
    },
    computed: {
      isLoginModalOpened() {
        return Boolean(this.$store.state.isLoginModalOpened);
      },
      isRegisterModalOpened() {
        return Boolean(this.$store.state.isRegisterModalOpened);
      }
    },
  }
</script>

<style lang="stylus" module>
</style>
