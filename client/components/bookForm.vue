<template>
  <div :class="$style.wrap">
    <h4>Добавить книгу</h4>
    <form @submit.prevent="handleSubmit">
      <base-input 
        v-model="bookTitle" 
        name="bookTitle"
        id="bookTitle" 
        labelText="Название"
        placeholder="Судьба человека"
        :modes="inputModes"
        :required="true"
        :class="$style.formInput"
      ></base-input>

      <base-input 
        v-model="authors" 
        id="authors" 
        name="authors"
        labelText="Авторы"
        :modes="inputModes"
        :class="$style.formInput"
      ></base-input>

      <div :class="$style.authorsList"></div>

      <base-button 
        type="submit"
        :class="$style.formInput" 
      >
        Добавить книгу
      </base-button>
    </form>
  </div>
</template>

<script>
  import input from 'client/elements/input'
  import button from 'client/elements/button'

  import request from 'client/fetch';

  export default {
    name: 'book-form',
    components: {
      'base-input': input,
      'base-button': button,
    },
    data() {
      return {
        bookTitle: '',
        authors: '',
        inputModes: [
          'white', 
          'textLeft',
        ],        
      }
    },
    methods: {
      async handleSubmit() {
        await request('add_book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            title: this.bookTitle,
            authors: this.authors.split(','),
          },
        }).catch(console.error);
        this.resetForm();
      },
      resetForm() {
        this.bookTitle = '';
        this.authors = '';
      },
    },
  }
</script>

<style lang="styl" module>
  .wrap
    flexColumn()

    form
      flex-grow 1
      flexColumn()

      .authorsList
        flex-grow 1

  .formInput + .formInput
    margin-top x(30)
</style>
