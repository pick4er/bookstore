<template>
  <div>
    <user-form />
  </div>
</template>

<script>
  import UserForm from 'client/components/UserForm';

  export default {
    name: 'user-page',
    components: {
      'user-form': UserForm,
    },
  }
</script>

<style lang="stylus" module>
</style>
