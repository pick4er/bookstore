<template>
  <div>
    <div :class="$style.row">
      <book-form :class="$style.block" />
      <author-form :class="$style.block" />
    </div>

    <div :class="$style.row">
      <update-book-form :class="$style.block" />
      <update-author-form :class="$style.block" />
    </div>

    <div :class="$style.row">
      <keep-book-form :class="$style.block" />
      <div :class="$style.block" />
    </div>
  </div>
</template>

<script>
  import AuthorForm from 'client/components/AuthorForm';
  import BookForm from 'client/components/BookForm';
  import UpdateBookForm from 'client/components/UpdateBookForm';
  import UpdateAuthorForm from 'client/components/UpdateAuthorForm';
  import KeepBookForm from 'client/components/KeepBookForm';

  export default {
    name: 'admin-page',
    components: {
      'book-form': BookForm,
      'author-form': AuthorForm,
      'update-book-form': UpdateBookForm,
      'update-author-form': UpdateAuthorForm,
      'keep-book-form': KeepBookForm,
    },
  }
</script>

<style lang="stylus" module>
  .row
    flexStretch()

    .block
      max-width x(375)
      width 100%
      
  .row + .row
    margin-top x(30)
</style>
