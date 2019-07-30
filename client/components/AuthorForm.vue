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
    <template #submitButton>
      <base-button 
        type="submit"
        :class="$style.formInput"
      >
        Добавить автора
      </base-button>
    </template>
  </base-form-layout>
</template>

<script>
  import BaseFormLayout from 'client/layouts/BaseFormLayout';
  import BaseInput from 'client/elements/BaseInput';
  import BaseButton from 'client/elements/BaseButton';

  import api from 'api';

  export default {
    name: 'author-form',
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
        await api('add_author', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            last_name: this.surname,
            first_name: this.name,
            middle_name: this.middleName,
          },
        }).catch(console.error);
        this.resetForm();
      },
      resetForm() {
        this.name = '';
        this.surname = '';
        this.middleName = '';
      },
    },
  }
</script>

<style lang="stylus" module>
  .formInput + .formInput
    margin-top x(30)
</style>
