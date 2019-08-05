<template>
  <form
    :class="$style.form"
    @submit.prevent="handleSubmit"
  >
    <div>
      <h4>Данные для заказа</h4>
      <base-input 
        v-model="surname" 
        name="surname"
        id="surname" 
        labelText="Фамилия"
        :modes="inputModes"
        :class="$style.input"
        placeholder="Каледин"
      />

      <base-input 
        v-model="name" 
        name="name"
        id="name" 
        labelText="Имя"
        :modes="inputModes"
        :class="$style.input"
        placeholder="Алексей"
      />

      <base-input 
        v-model="middleName" 
        name="middleName"
        id="middleName" 
        labelText="Отчество"
        :modes="inputModes"
        :class="$style.input"
        placeholder="Максимович"
      />

      <base-input 
        v-model="phone" 
        name="phone"
        id="phone" 
        labelText="Телефон"
        :modes="inputModes"
        :class="$style.input"
        placeholder="+7 (xxx) xxx-xx-xx"
      />

      <base-input 
        v-model="shippingAddress" 
        name="shippingAddress"
        id="shippingAddress" 
        labelText="Адрес доставки"
        :modes="inputModes"
        :class="$style.input"
        placeholder="Ростов-на-Дону, до востребования"
      />

      <base-button 
        type="submit" 
        :class="$style.lastBlock"
      >Сохранить</base-button>
    </div>

    <div>
      <h4>Профиль</h4>
      <base-input 
        v-model="email"
        name="email"
        id="email"
        type="email"
        labelText="Email"
        placeholder="pick4er@gmail.com"
        :modes="inputModes"
        :class="$style.input"
      />

      <base-input 
        v-model="login"
        name="login"
        id="login"
        labelText="Логин"
        placeholder="pick4er"
        :modes="inputModes"
        :class="$style.input"
      />

      <base-input 
        v-model="password"
        name="password"
        id="password"
        type="password"
        labelText="Новый пароль"
        placeholder=""
        :modes="inputModes"
        :class="$style.input"
      />

      <span v-if="success" :class="$style.success">
        {{ success }}
      </span>

      <span v-else-if="error" :class="$style.error">
        {{ error }}
      </span>
    </div>
  </form>
</template>

<script>
  import BaseInput from 'client/elements/BaseInput';
  import BaseButton from 'client/elements/BaseButton';

  import formMessages from 'client/mixins/formMessages';

  export default {
    name: 'user-form',
    mixins: [formMessages],
    components: {
      'base-input': BaseInput,
      'base-button': BaseButton,
    },
    data() {
      return {
        /* profile fields */
        email: '',
        login: '',
        password: '',
        /* billing fields */
        name: '',
        surname: '',
        middleName: '',
        phone: '',
        shippingAddress: '',

        inputModes: [
          'white',
          'textLeft',
        ],
      }
    },
    beforeMount() {
      this.$store.state.user &&
      this.retrieveUserFields(
        this.$store.getters.sanitizedUser
      );
    },
    computed: {
      isMobile() {
        return this.$store.state.isMobile;
      },
    },
    watch: {
      '$store.state.user'(user) {
        user && this.retrieveUserFields(
          this.$store.getters.sanitizedUser
        );
      },
    },
    methods: {
      retrieveUserFields(user) {
        Object.keys(user).forEach(fieldName => {
          if (user[fieldName] && !this[fieldName]) {
            this[fieldName] = user[fieldName];
          }
        });
      },
      handleSubmit() {
        this.$store.dispatch({
          type: 'CHANGE_USER',
          user: this.$data,
          onError: this.showError,
          onSuccess: this.showSuccess,
        });
      },
    },
  }
</script>

<style lang="stylus" module>
  html[data-layout="mobile"]
    .form
      flex-flow column-reverse

      div + div
        margin-left x(0)
        margin-bottom x(40)

      div
        max-width none

        h4
          margin-bottom x(18)

    .input + .input
      margin-top x(12)
      
    .lastBlock
      margin-top x(28)

  .form
    display flex
    flex-flow row nowrap
    width 100%
    
    div
      width 100%
      max-width x(375)

      h4
        margin-top x(0)

    div + div
      margin-left 15%

  .input
    width 100%
    flex-grow 0
  
  .error
    errorText()

  .success
    successText()

  .lastBlock
    margin-top x(40)

  .input + .input
    margin-top x(18)
</style>
