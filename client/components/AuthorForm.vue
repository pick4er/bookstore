<template>
  <base-form-layout :onSubmit="handleSubmit">
    <template #header>
      <h4>Добавить автора</h4>
    </template>
    <template #inputs>
      <base-input 
        v-model="surname" 
        name="surname"
        id="surname" 
        labelText="Фамилия"
        :modes="inputModes"
        :class="$style.formInput"
        placeholder="Шолохов"
      />

      <base-input 
        required
        v-model="name" 
        id="name" 
        name="name"
        labelText="Имя"
        placeholder="Михаил"
        :modes="inputModes"
        :class="$style.formInput"
      />

      <base-input 
        v-model="middleName" 
        id="middleName" 
        name="middleName"
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
      >Добавить автора</base-button>
    </template>
  </base-form-layout>
</template>

<script>
  import BaseFormLayout from 'client/layouts/BaseFormLayout';
  import BaseInput from 'client/elements/BaseInput';
  import BaseButton from 'client/elements/BaseButton';

  import formMessages from 'client/mixins/formMessages';

  export default {
    name: 'author-form',
    mixins: [formMessages],
    components: {
      'base-input': BaseInput,
      'base-button': BaseButton,
      'base-form-layout': BaseFormLayout,
    },
    data() {
      return {
        name: '',
        surname: '',
        middleName: '',
        inputModes: [
          'white', 
          'textLeft',
        ],
      }
    },
    methods: {
      async handleSubmit() {
        this.$store.dispatch({
          type: 'ADD_AUTHOR',
          author: this.$data,
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
        this.error = '';
        this.sucess = '';
      },
    },
  }
</script>

<style lang="stylus" module>
  .formInput + .formInput
    margin-top x(30)

  .error
    errorText()
    
  .success
    successText()
</style>
