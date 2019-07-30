<template>
  <base-form-layout :onSubmit="handleSubmit">
    <template #header>
      <h4>Оформить приход книги</h4>
    </template>

    <template #inputs>
      <base-dropdown
        labelText="Книга"
        titleKey="title"
        selectionKey="book_id"
        :required="true"
        :listClass="$style.booksList"
        :buttonClass="$style.ellipsis"
        :selectionClass="$style.ellipsis"
        :class="$style.formInput"
        :values="unselectedBooks"
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
        v-model="qty"
        name="qty"
        id="qty"
        labelText="Приход"
        placeholder="10"
        :modes="inputModes"
        :class="$style.formInput"
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
      >Оформить приход</base-button>
    </template>
  </base-form-layout>
</template>

<script>
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';
  import BaseDropdown from 'client/elements/BaseDropdown';
  import BaseFormLayout from 'client/layouts/BaseFormLayout';

  import isNumber from 'helpers/isNumber';
  import api from 'api';

  export default {
    name: 'keep-book-form',
    components: {
      'base-input': BaseInput,
      'base-button': BaseButton,
      'base-dropdown': BaseDropdown,
      'base-form-layout': BaseFormLayout,
    },
    data() {
      return {
        qty: '',
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
      loadedBooks() {
        return this.$store.state.books || [];
      },
      unselectedBooks() {
        return this.loadedBooks.filter(
          v => (
            Number(v.book_id) !==
            Number(this.selectedBook.book_id)
          ),
        );
      },
    },
    beforeDestroy() {
      this.errorTimerId && clearTimeout(this.errorTimerId);
      this.successTimerId && clearTimeout(this.successTimerId);
    },
    methods: {
      validateFormAndIsValid() {
        let isValid = true;
        if (!isNumber(this.qty)) {
          this.handleError('Количество не должно равняться нулю');
          isValid = false;
        } else if (!this.selectedBook.book_id) {
          this.handleError('Выберите книгу');
          isValid = false;
        }

        return isValid;
      },
      async handleSubmit() {
        if (!this.validateFormAndIsValid()) return;

        let isError = false;
        const result = await api('keep_book', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            book_id: this.selectedBook.book_id,
            qty: this.qty,
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
        this.qty = '';
        this.selectedBook = {};
      },
      onSelectedBookSelect() {
        this.selectedBook = {};
      },
      onBooksOpen() {
        if ((this.loadedBooks || []).length !== 0) return;

        this.$store.dispatch({
          type: 'FETCH_BOOKS',
        });
      },
      onBookSelect(book_id) {
        this.selectedBook = this.loadedBooks.find(
          v => Number(v.book_id) === Number(book_id),
        );
      },
    },
  }
</script>

<style lang="stylus" module>
  .booksList
    max-width x(375)
    width 100%

  .ellipsis
    textEllipsis()

  .formInput + .formInput
    margin-top x(30)

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
