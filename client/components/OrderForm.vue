<template>
  <base-form-layout :onSubmit="handleSubmit">
    <template #header>
      <h4>Оформить заказ</h4>
    </template>

    <template #inputs>
      <base-input 
        :required="true"
        v-model="phone" 
        name="phone"
        id="phone" 
        labelText="Телефон"
        :modes="inputModes"
        :class="$style.formInput"
        placeholder="+7 (xxx) xxx-xxx-xx"
      />

      <base-input 
        v-model="buyer" 
        id="buyer" 
        name="buyer"
        labelText="Фамилия, имя, отчество"
        placeholder="Каледин Алексей Максимович"
        :modes="inputModes"
        :class="$style.formInput"
      />

      <base-input 
        v-model="address" 
        id="address" 
        name="address"
        labelText="Адрес доставки"
        placeholder="Ростов-на-Дону, до востребования"
        :modes="inputModes"
        :class="$style.formInput"
      />
    </template>

    <template #submitButton>
      <base-button 
        type="submit"
        :class="$style.formInput"
      >Заказать</base-button>
    </template>
  </base-form-layout>
</template>

<script>
  import BaseFormLayout from 'client/layouts/BaseFormLayout';
  import BaseInput from 'client/elements/BaseInput';
  import BaseButton from 'client/elements/BaseButton';

  export default {
    name: 'order-form',
    components: {
      'base-form-layout': BaseFormLayout,
      'base-input': BaseInput,
      'base-button': BaseButton,
    },
    data() {
      return {
        phone: '',
        buyer: '',
        address: '',
        inputModes: [
          'white', 
          'textLeft',
        ],        
      };
    },
    methods: {
      handleSubmit() {
        this.$store.dispatch({
          type: 'CREATE_ORDER',
          onSuccess: this.resetForm,
        });
      },
      resetForm() {
        this.phone = '';
        this.buyer = '';
        this.address = '';
      }
    },
  };
</script>

<style lang="stylus" module>
  .formInput + .formInput
    margin-top x(30)
</style>