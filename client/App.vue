<template>
  <base-layout>
    <router-view />
    <admin-modal :isOpened="isAdminModalOpened" :next="next" />
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
      next() {
        this.$store.commit({
          type: 'UPDATE_AUTH', 
          isAuth: true,
        });
        this.$store.commit({
          type: 'CLOSE_ADMIN_MODAL',
        });
        this.$router.push('/admin');
      },
    },
  }
</script>

<style lang="stylus" module>
</style>
