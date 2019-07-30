<template>
  <base-form-layout :onSubmit="handleSubmit">
    <template #header>
      <h4>Обновить книгу</h4>
    </template>

    <template #inputs>
      <base-dropdown
        :required="true"
        name="bookTitle"
        id="bookTitle" 
        labelText="Книга"
        :listClass="$style.bookListClass"
        :buttonClass="$style.ellipsis"
        :selectionClass="$style.ellipsis"
        :class="$style.formInput"
        :values="unselectedBooks"
        titleKey="title"
        selectionKey="book_id"
        direction="bottom"
        :onOpen="onBooksOpen"
        :onSelect="onBookSelect"
      />

      <div 
        :class="$style.selectedBook"
        v-if="selectedBook.book_id"
      >
        <button 
          type="button" 
          @click="onSelectedBookSelect()"
        >{{ selectedBook.display_name }}</button>
      </div>

      <base-input 
        v-model="bookTitle" 
        name="bookTitle"
        id="bookTitle" 
        labelText="Название"
        placeholder="Тихий Дон"
        :modes="inputModes"
        :class="$style.formInput"
      />

      <base-dropdown
        name="bookTitle"
        id="bookTitle" 
        labelText="Авторы"
        :class="$style.formInput"
        :values="unselectedAuthors"
        titleKey="display_name"
        selectionKey="author_id"
        :onOpen="onAuthorsOpen"
        :onSelect="onAuthorSelect"
      />

      <div 
        :class="$style.selectedAuthorsList"
        v-if="selectedAuthors.length > 0"
      >
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
      </div>

      <base-input
        v-model="price" 
        name="price"
        id="price" 
        labelText="Цена (руб.)"
        placeholder="100"
        :modes="inputModes"
        :class="$style.formInput"
      />

      <base-input
        v-model="qty" 
        name="qty"
        id="qty" 
        labelText="Новое количество"
        placeholder="10"
        :modes="inputModes"
        :class="$style.formInput"
        hintText="Важно! Применять только в случае кассовых разрывов"
      />
    </template>

    <template #messages>
      <div v-if="error" :class="$style.error">
        {{ error }}
      </div>

      <div v-else-if="success" :class="$style.success">
        {{ success }}
      </div>
    </template>

    <template #submitButton>
      <base-button 
        type="submit"
        :class="[$style.formInput, $style.submitButton]"
      >Обновить книгу</base-button>
    </template>
  </base-form-layout>
</template>

<script>
  import BaseFormLayout from 'client/layouts/BaseFormLayout';
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';
  import BaseDropdown from 'client/elements/BaseDropdown';

  import isNumber from 'helpers/isNumber'
  import api from 'api';

  export default {
    name: 'update-book-form',
    components: {
      'base-input': BaseInput,
      'base-button': BaseButton,
      'base-dropdown': BaseDropdown,
      'base-form-layout': BaseFormLayout,
    },
    data() {
      return {
        bookTitle: '',
        price: '',
        qty: '',
        selectedAuthors: [],
        selectedBook: {},
        error: '',
        success: '',
        errorTimerId: '',
        successTimerId: '',
        inputModes: [
          'white', 
          'textLeft',
        ],
      }
    },
    computed: {
      loadedAuthors() {
        return this.$store.state.authors || [];
      },
      loadedBooks() {
        return this.$store.state.books || [];
      },
      unselectedAuthors() {
        return this.loadedAuthors.filter(
          v => !this.selectedAuthors.find(
            sv => Number(sv.author_id) === Number(v.author_id),
          ),
        );
      },
      selectedAuthorsValues() {
        return this.selectedAuthors.map(
          v => v.display_name,
        );
      },
      unselectedBooks() {
        return this.loadedBooks.filter(
          v => (
            Number(v.book_id) !== 
            Number(this.selectedBook.book_id)
          ),
        );
      },
      selectedBookValue() {
        return this.selectedBook.display_name;
      },
    },
    watch: {
      selectedBook(nextBook, book) {
        if (!nextBook.book_id) {
          this.bookTitle = '';
          this.qty = '';
          this.price = '';
          this.selectedAuthors = [];

          return;
        }

        this.bookTitle = nextBook.title;
        this.qty = nextBook.onhand_qty;
        this.price = nextBook.price;

        if (this.loadedAuthors.length > 0) {
          this.retreiveSelectedBookAuthors();
        }
      },
      loadedAuthors(nextLoadedAuthors, loadedAuthors) {
        if (
          nextLoadedAuthors.length > 0 && 
          loadedAuthors.length === 0 &&
          this.selectedBook.book_id &&
          this.selectedAuthors.length === 0
        ) {
          this.retreiveSelectedBookAuthors();
        }
      },
    },
    beforeDestroy() {
      this.errorTimerId && clearTimeout(this.errorTimerId);
      this.successTimerId && clearTimeout(this.successTimerId);
    },
    methods: {
      validateFormAndIsValid() {
        let isValid = true;
        if (Boolean(this.qty) && !isNumber(this.qty)) {
          this.handleError('Количество должно быть положительным числом');
          isValid = false;
        } else if (!this.selectedBook.book_id) {
          this.handleError('Выберите книгу');
          isValid = false;
        } else if (!this.bookTitle) {
          this.handleError('Название не должно быть пустым');
          isValid = false;
        } else if (!isNumber(this.price)) {
          this.handleError('Цена должна быть положительным числом');
          isValid = false;
        }

        return isValid;
      },
      async handleSubmit() {
        if (!this.validateFormAndIsValid()) return;

        let isError = false;
        const result = await api('update_book', {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            book_id: this.selectedBook.book_id,
            title: this.bookTitle,
            price: this.price,
            qty: this.qty,
            authors: this.selectedAuthors.map(v => v.author_id),
          },
        }).catch(e => {
          isError = true;
          console.error(e);
          this.handleError(e.message);
        });
        if (isError) return;

        if (result.status === 'error') {
          this.handleError(result.message);
          return;
        }

        this.handleSuccess(result.message);
        this.resetForm();
        this.$store.dispatch({
          type: 'FETCH_BOOKS',
        });
      },
      handleError(errorText) {
        this.clearSuccess();
        this.error = errorText;
        this.errorTimerId = setTimeout(() => {
          this.error = '';
        }, 6666);
      },
      handleSuccess(successText) {
        this.clearError();
        this.success = successText;
        this.successTimerId = setTimeout(() => {
          this.success = '';
        }, 6666);
      },
      clearError() {
        this.error = '';
        clearTimeout(this.errorTimerId);
      },
      clearSuccess() {
        this.success = '';
        clearTimeout(this.successTimerId);
      },
      resetForm() {
        this.selectedBook = {};
        this.bookTitle = '';
        this.qty = '';
        this.price = '';
        this.selectedAuthors = [];
      },
      retreiveSelectedBookAuthors() {
        const { authors_ids } = this.selectedBook;
        this.selectedAuthors = this.loadedAuthors.filter(
          v => authors_ids.includes(Number(v.author_id)),
        ) || [];
      },
      onAuthorSelect(author_id) {
        this.selectedAuthors = this.selectedAuthors.concat(
          this.loadedAuthors.find(
            v => Number(v.author_id) === Number(author_id),
          ),
        );
      },
      onAuthorsOpen() {
        if ((this.loadedAuthors || []).length !== 0) return;

        this.$store.dispatch({
          type: 'FETCH_AUTHORS',
        });
      },
      onBookSelect(book_id) {
        this.selectedBook = this.loadedBooks.find(
          v => Number(v.book_id) === Number(book_id),
        );
      },
      onBooksOpen() {
        this.onAuthorsOpen();
        if ((this.loadedBooks || []).length !== 0) return;

        this.$store.dispatch({
          type: 'FETCH_BOOKS',
        });
      },
      onSelectedBookSelect() {
        this.selectedBook = {};
      },
      onSelectedAuthorSelect(author_id) {
        this.selectedAuthors = this.selectedAuthors.filter(
          v => Number(v.author_id) !== Number(author_id),
        );
      },
    }
  }
</script>

<style lang="stylus" module>
  .formInput + .formInput
    margin-top x(30)

  .bookListClass
    z-index 1
    min-height x(200)

  .ellipsis
    textEllipsis()

  .selectedAuthorsList
    margin-top x(10)
    margin-bottom x(10)
    min-height x(20)

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

  .selectedBook
    margin-top x(10)
    margin-bottom x(10)
    min-height x(20)
    font-size x(16)
    font-family $robotoLight
    
    button
      background-color $white
      border none
      text-align left
      padding x(0)

  .submitButton
    margin-top x(30)

  .error
    errorText()
    
  .success
    successText()
</style>
