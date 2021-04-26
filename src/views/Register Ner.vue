<template>
    <form class="card auth-card" @submit.prevent="onSubmit">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
          <label for="email">Email <span class="required">*</span></label>
          <input id="email" type="text" v-model.trim="email">
          <small class="helper-text invalid" v-for="(error, index) of v$.email.$errors" :key="index">
          {{error.$message}}
          </small>
    </div>
    <div class="input-field">
          <label for="password">Password <span class="required">*</span></label>
          <input id="password" type="password" v-model.trim="password">
          <small class="helper-text invalid" v-for="(error, index) of v$.password.$errors" :key="index">
          {{'teie viga on: ' + error.$message}}
        </small>
    </div>
    <div class="input-field">
          <label for="name">Name <span class="required">*</span></label>
          <input id="name" type="text" v-model="name">
          <small class="helper-text invalid" v-for="(error, index) of v$.name.$errors" :key="index">
          {{'teie viga on: ' + error.$message}}
        </small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree"/>
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import { email, required, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'register',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: ''
  }),
  validations () {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { required },
      agree: { required }
    }
  },
  methods: {
    async onSubmit () {
      this.v$.$touch() // validacija do alert'a na vvodimije dannije
      if (this.v$.$error) return
      alert('Form is valid')
      this.$router.push('/login')
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        // console.log(formData)
        await this.$store.dispatch('register', formData)
        this.$router.push('/login') // esli mi sdelajem login, to popadajem na Home stranicu
      } catch (e) {
      }
    }
  }
}
</script>
