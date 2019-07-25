<template>
  <div :class="$style.form">
    <book-form :class="$style.block" />
    <author-form :class="$style.block" />
  </div>
</template>

<script>
  import AuthorForm from 'client/components/AuthorForm';
  import BookForm from 'client/components/BookForm';

  export default {
    name: 'admin-page',
    components: {
      'book-form': BookForm,
      'author-form': AuthorForm,
    },
  }
</script>

<style lang="stylus" module>
  .form
    flexStretch()

    .block
      max-width x(375)
      width 100%
</style>
