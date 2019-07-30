<template>
  <base-form-layout :onSubmit="handleSubmit">
    <template #header>
      <h4>Обновить автора</h4>
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
        :class="$style.formInput"
      >Обновить автора</base-button>
    </template>
  </base-form-layout>
</template>

<script>
  import BaseFormLayout from 'client/layouts/BaseFormLayout';
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';
  import BaseDropdown from 'client/elements/BaseDropdown';

  import api from 'api';

  export default {
    name: 'update-author-form',
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
    beforeDestroy() {
      this.errorTimerId && clearTimeout(this.errorTimerId);
      this.successTimerId && clearTimeout(this.successTimerId);
    },
    methods: {
      validateFormAndIsValid() {
        let isValid = true;
        if (!this.selectedAuthor.author_id) {
          this.handleError('Выберите автора');
          isValid = false;
        } else if (!this.name) {
          this.handleError('Введите имя');
          isValid = false;
        }

        return isValid;
      },
      async handleSubmit() {
        if (!this.validateFormAndIsValid()) return;

        let isError = false;
        await api('update_author', {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            author_id: this.selectedAuthor.author_id,
            first_name: this.name,
            last_name: this.surname,
            middle_name: this.middleName,
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
          type: 'FETCH_AUTHORS',
        });
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
        this.name = '';
        this.surname = '';
        this.middleName = '';
        this.selectedAuthor = {};
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
