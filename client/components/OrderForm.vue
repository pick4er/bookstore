<template>
  <div :class="$style.wrap">
    <h4>Оформить заказ</h4>
    <form @submit.prevent="handleSubmit">
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

      <base-button 
        type="submit"
        :class="$style.formInput"
      >Заказать</base-button>
    </form>
  </div>
</template>

<script>
  import BaseInput from 'client/elements/BaseInput';
  import BaseButton from 'client/elements/BaseButton';

  export default {
    name: 'order-form',
    components: {
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
      async handleSubmit() {
        const self = this;

        await new Promise(res => {
          setTimeout(() => {
            console.log('ordered!');
            self.resetForm();
            res();
          }, 1000);
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
  .wrap
    flexColumn()

  .formInput + .formInput
    margin-top x(30)
</style>