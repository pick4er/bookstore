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

  import formMessages from 'client/mixins/formMessages';
  import isNumber from 'helpers/isNumber';

  export default {
    name: 'keep-book-form',
    mixins: [formMessages],
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
    methods: {
      validateFormAndIsValid() {
        let isValid = true;
        if (!isNumber(this.qty)) {
          this.showError('Количество не должно равняться нулю');
          isValid = false;
        } else if (!this.selectedBook.book_id) {
          this.showError('Выберите книгу');
          isValid = false;
        }

        return isValid;
      },
      handleSubmit() {
        if (!this.validateFormAndIsValid()) return;

        this.$store.dispatch({
          type: 'KEEP_BOOK',
          book_id: this.selectedBook.book_id,
          qty: this.qty,
          onError: this.showError,
          onSuccess: msg => {
            this.showSuccess(msg);
            this.resetForm();
          },
        });
      },
      resetForm() {
        this.qty = '';
        this.selectedBook = {};
        this.error = '';
        this.success = '';
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
