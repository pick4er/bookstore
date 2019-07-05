<template>
  <base-layout>
    <template>
      <books :books="books"></books>
      <div :class="$style.form">
        <book-form :class="$style.block"></book-form>
        <author-form :class="$style.block"></author-form>
      </div>
    </template> 
  </base-layout>
</template>

<script>
  import baseLayout from 'client/layouts/base';
  import books from 'client/components/books';
  import authorForm from 'client/components/authorForm';
  import bookForm from 'client/components/bookForm';

  export default {
    name: 'catalog-page',
    props: {
      books: {
        type: Array,
        default: [],
      },
    },
    components: {
      books,
      'base-layout': baseLayout,
      'book-form': bookForm,
      'author-form': authorForm,
    }
  }
</script>

<style lang="styl" module>
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
