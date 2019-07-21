<template>
  <base-layout>
    <router-view />
    <admin-modal 
      :isOpened="isAdminModalOpened" 
      :auth="auth"
      :close="close"
    />
  </base-layout>
</template>

<script>
  import BaseLayout from 'client/layouts/BaseLayout';
  import AdminModal from 'client/components/AdminModal';

  export default {
    name: 'App',
    components: {
      'base-layout': BaseLayout,
      'admin-modal': AdminModal,
    },
    computed: {
      isAdminModalOpened() {
        return this.$store.state.isAdminModalOpened;
      }
    },
    methods: {
      auth() {
        this.$store.commit({
          type: 'UPDATE_AUTH', 
          isAuth: true,
        });
        this.$store.commit({
          type: 'CLOSE_ADMIN_MODAL',
        });
        this.$router.push('/admin');
      },
      close() {
        this.$store.commit({
          type: 'CLOSE_ADMIN_MODAL',
        });
      },
    },
  }
</script>

<style lang="stylus" module>
</style>
