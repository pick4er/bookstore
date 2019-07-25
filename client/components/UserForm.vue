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

      <span v-if="billingError" :class="$style.error">
        {{ billingError }}
      </span>

      <span v-else-if="commonError" :class="$style.error">
        {{ commonError }}
      </span>

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

      <span v-if="successMessage" :class="$style.success">
        {{ successMessage }}
      </span>

      <span v-if="profileError" :class="$style.error">
        {{ profileError }}
      </span>
    </div>
  </form>
</template>

<script>
  import BaseInput from 'client/elements/BaseInput';
  import BaseButton from 'client/elements/BaseButton';

  import api from 'api';

  export default {
    name: 'user-form',
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

        successMessage: '',
        profileError: '',
        billingError: '',
        commonError: '',

        errorTimerId: null,
        successTimerId: null,
        inputModes: [
          'white',
          'textLeft',
        ],
      }
    },
    beforeDestroy() {
      this.clearErrors();
      this.clearSuccess();
    },
    beforeMount() {
      this.$store.state.user &&
      this.retrieveUserFields(this.$store.getters.sanitizedUser);
    },
    computed: {
      userId() {
        return (this.$store.state.user || {}).user_id;
      },
      billingId() {
        return (this.$store.state.user || {}).billing_id;
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
      async handleSubmit() {
        const response = await api('user', {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            user_id: this.userId,
            billing_id: this.billingId,
            email: this.email,
            login: this.login,
            password: this.password,
            first_name: this.name,
            last_name: this.surname,
            middle_name: this.middleName,
            phone: this.phone,
            shipping_address: this.shippingAddress,
          },
        }).catch(console.error);

        if (response.status === 'ok') {
          this.$store.commit({
            type: 'UPDATE_USER',
            user: response.user,
          });
          this.showSuccess();

          return;
        }

        this.showError(response);
      },
      showSuccess() {
        this.clearErrors();
        this.successMessage = 'Обновлено!';
        this.successTimerId = setTimeout(() => {
          this.successMessage = null;
        }, 6666);
      },
      showError(response) {
        this.clearSuccess();
        if (response.status === 'profile_error') {
          this.profileError = response.message
        } else if (response.stats === 'billing_error') {
          this.billingError = response.message
        } else {
          this.commonError = response.message
        }

        this.errorTimerId = setTimeout(() => {
          this.profileError = null;
          this.billingError = null;
          this.commonError = null;
        }, 6666);
      },
      clearErrors() {
        clearTimeout(this.errorTimerId);
        this.billingError = null;
        this.profileError = null;
      },
      clearSuccess() {
        clearTimeout(this.successTimerId);
        this.successMessage = null;
      },
    },
  }
</script>

<style lang="stylus" module>
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
