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
      />

      <base-dropdown
        labelText="Авторы"
        :class="$style.formInput"
        :values="unselectedAuthors"
        titleKey="display_name"
        selectionKey="author_id"
        :onOpen="onOpen"
        :onSelect="onAuthorSelect"
      />

      <div :class="$style.selectedAuthorsList">
        <template v-if="selectedAuthors.length > 0">
          <ul>
            <li
              v-for="({author_id, display_name}) in selectedAuthors"
              :key="author_id"
            >
              <button 
                type="button"
                @click="onSelectedAuthorSelect(author_id)"
              >{{ display_name }}</button>
            </li>
          </ul>
        </template> 
      </div>

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
  import BaseInput from 'client/elements/BaseInput'
  import BaseDropdown from 'client/elements/BaseDropdown'
  import BaseButton from 'client/elements/BaseButton'

  import api from 'api';

  export default {
    name: 'book-form',
    components: {
      'base-input': BaseInput,
      'base-button': BaseButton,
      'base-dropdown': BaseDropdown,
    },
    data() {
      return {
        bookTitle: '',
        selectedAuthors: [],
        loadedAuthors: [],
        inputModes: [
          'white', 
          'textLeft',
        ],        
      }
    },
    computed: {
      selectedAuthorsValues() {
        return this.selectedAuthors.map(
          v => v.display_name
        );
      },
      unselectedAuthors() {
        return this.loadedAuthors.filter(
          v => !this.selectedAuthors.find(
            sv => Number(sv.author_id) === Number(v.author_id),
          ),
        );
      },
    },
    methods: {
      async handleSubmit() {
        await api('add_book', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            title: this.bookTitle,
            authors: this.selectedAuthors.map(v => v.author_id),
          },
        }).catch(console.error);
        this.resetForm();
      },
      resetForm() {
        this.bookTitle = '';
        this.selectedAuthors = [];
      },
      async onOpen() {
        const result = await api('authors', {
          method: 'GET',
          credentials: 'include',
        }).catch(console.error);
        this.loadedAuthors = result;
      },
      onAuthorSelect(author_id) {
        this.selectedAuthors = this.selectedAuthors.concat(
          this.loadedAuthors.find(
            v => Number(v.author_id) === Number(author_id),
          ),
        );
      },
      onSelectedAuthorSelect(selectedAuthorId) {
        this.selectedAuthors = this.selectedAuthors.filter(
          v => Number(v.author_id) !== Number(selectedAuthorId),
        );
      },
    },
  }
</script>

<style lang="stylus" module>
  .wrap
    flexColumn()

    form
      flex-grow 1
      flexColumn()

      .selectedAuthorsList
        flex-grow 1

  .selectedAuthorsList
    margin-top x(6)
    margin-bottom x(6)

    ul
      list-style none
      padding x(0)
      margin x(0)
      font-size x(16)
      font-family $robotoLight
      
      li
        display inline
        line-height x(20)

      li + li
        &:before
          content ', '

      button
        background-color $white
        border none
        padding x(0)

  .formInput + .formInput
    margin-top x(30)
</style>
