<template>
  <base-form-layout :onSubmit="handleSubmit">
    <template #header>
      <h4 :class="$style.header">Обновить автора</h4>
    </template>

    <template #inputs>
      <base-dropdown 
        :required="true"
        labelText="Автор"
        :class="$style.formInput"
        :listClass="$style.authorListClass"
        :values="unselectedAuthors"
        direction="bottom"
        titleKey="display_name"
        selectionKey="author_id"
        :onOpen="onAuthorsOpen"
        :onSelect="onAuthorSelect"
      />

      <div
        :class="$style.selectedAuthor"
        v-if="selectedAuthor.author_id"
      >
        <button 
          type="button" 
          @click="onSelectedAuthorSelect()"
        >{{ selectedAuthor.display_name }}</button>
      </div>

      <base-input 
        v-model="surname"
        name="surname"
        id="surname"
        labelText="Фамилия"
        placeholder="Шолохов"
        :modes="inputModes"
        :class="$style.formInput"
      />

      <base-input 
        v-model="name"
        name="name"
        id="name"
        labelText="Имя"
        placeholder="Михаил"
        :required="true"
        :modes="inputModes"
        :class="$style.formInput"
      />

      <base-input 
        v-model="middleName"
        name="middleName"
        id="middleName"
        labelText="Отчество"
        placeholder="Александрович"
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
      >Обновить автора</base-button>
    </template>
  </base-form-layout>
</template>

<script>
  import BaseFormLayout from 'client/layouts/BaseFormLayout';
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';
  import BaseDropdown from 'client/elements/BaseDropdown';

  import formMessages from 'client/mixins/formMessages';

  export default {
    name: 'update-author-form',
    mixins: [formMessages],
    components: {
      'base-input': BaseInput,
      'base-button': BaseButton,
      'base-dropdown': BaseDropdown,
      'base-form-layout': BaseFormLayout,
    },
    data() {
      return {
        name: '',
        surname: '',
        middleName: '',
        selectedAuthor: {},
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
      unselectedAuthors() {
        return this.loadedAuthors.filter(
          v => (
            Number(v.author_id) !== 
            Number(this.selectedAuthor.author_id)
          ),
        );
      },
    },
    watch: {
      selectedAuthor(nextAuthor, author) {
        if (!nextAuthor.author_id) {
          this.name = '';
          this.surname = '';
          this.middleName = '';

          return;
        }

        this.name = nextAuthor.first_name || '';
        this.surname = nextAuthor.last_name || '';
        this.middleName = nextAuthor.middle_name || '';
      },
    },
    methods: {
      validateFormAndIsValid() {
        let isValid = true;
        if (!this.selectedAuthor.author_id) {
          this.showError('Выберите автора');
          isValid = false;
        } else if (!this.name) {
          this.showError('Введите имя');
          isValid = false;
        }

        return isValid;
      },
      async handleSubmit() {
        if (!this.validateFormAndIsValid()) return;

        this.$store.dispatch({
          type: 'UPDATE_AUTHOR',
          author: {
            author_id: this.selectedAuthor.author_id,
            ...this.$data
          },
          onError: this.showError,
          onSuccess: msg => {
            this.showSuccess(msg);
            this.resetForm();
          },
        });
      },
      resetForm() {
        this.name = '';
        this.surname = '';
        this.middleName = '';
        this.selectedAuthor = {};
        this.error = '';
        this.success = '';
      },
      onAuthorsOpen() {
        if ((this.loadedAuthors || []).length !== 0) return;

        this.$store.dispatch({
          type: 'FETCH_AUTHORS',
        });
      },
      onAuthorSelect(author_id) {
        this.selectedAuthor = this.loadedAuthors.find(
          v => Number(v.author_id) === Number(author_id),
        );
      },
      onSelectedAuthorSelect() {
        this.selectedAuthor = {};
      },
    },
  }
</script>

<style lang="stylus" module>
  html[data-layout="mobile"]
    .header
      margin-top x(20)
      margin-bottom x(20)

    .formInput + .formInput
      margin-top x(20)

    .submitButton
      margin-top x(20)

    .selectedAuthor
      font-size x(14)


  .formInput + .formInput
    margin-top x(30)

  .selectedAuthor
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

  .authorListClass
    z-index 1
    min-height x(200)

  .error
    errorText()
    
  .success
    successText()
</style>
