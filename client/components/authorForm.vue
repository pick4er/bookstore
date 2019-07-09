<template>
  <div>
    <h4>Добавить автора</h4>
    <form @submit.prevent="handleSubmit">
      <base-input 
        v-model="surname" 
        name="surname"
        id="surname" 
        labelText="Фамилия"
        :modes="inputModes"
        :class="$style.formInput"
        placeholder="Шолохов"
      ></base-input>

      <base-input 
        v-model="name" 
        id="name" 
        name="name"
        labelText="Имя"
        placeholder="Михаил"
        :modes="inputModes"
        :required="true"
        :class="$style.formInput"
      ></base-input>

      <base-input 
        v-model="middleName" 
        id="middleName" 
        name="middleName"
        labelText="Отчество"
        placeholder="Александрович"
        :modes="inputModes"
        :class="$style.formInput"
      ></base-input>

      <base-button 
        type="submit"
        :class="$style.formInput"
      >
        Добавить автора
      </base-button>
    </form>
  </div>  
</template>

<script>
  import input from 'client/elements/input'
  import button from 'client/elements/button'

  import request from 'client/fetch';

  export default {
    name: 'author-form',
    components: {
      'base-input': input,
      'base-button': button,
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
        await request('add_author', {
          method: 'POST',
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
