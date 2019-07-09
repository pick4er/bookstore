<template>
  <div :class="$style.form">
    <book-form :class="$style.block"></book-form>
    <author-form :class="$style.block"></author-form>
  </div>
</template>

<script>
  import authorForm from 'client/components/authorForm';
  import bookForm from 'client/components/bookForm';

  export default {
    name: 'admin-page',
    components: {
      'book-form': bookForm,
      'author-form': authorForm,
    },
  }
</script>

<style lang="stylus" module>
  .form
    display flex
    flex-flow row nowrap
    justify-content space-around
    align-items stretch
    width 100%

    .block
      max-width x(375)
      width 100%
</style>
