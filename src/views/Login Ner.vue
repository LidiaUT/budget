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
    </div>
    <div class="card-action">
        <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit">
            <!-- objazatelno imenno tip ravnij subMit, 4tobi zasubmitit dannoe sobitie -->
            Войти
            <i class="material-icons right">send</i>
        </button>
        </div>

        <p class="center">
        Нет аккаунта?
        <router-link class="pink-text" to="/register">Зарегистрироваться</router-link>
        </p>
    </div>
    </form>
</template>

<script>
import messages from '@/utils/messages'
import { email, required, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'login', // imja dannoj stranici
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations () {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) }
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) { // esli na konce URL login stranici budet message=logout, to pojavitsja; messages importirovali iz nami ze sozdannogo faila messages.js
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async onSubmit () {
      this.v$.$touch() // validacija do alert'a na vvodimije dannije
      if (this.v$.$error) return
      alert('Form is valid')
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        // console.log(formData)
        this.$router.push('/history') // esli mi sdelajem login, to popadajem na Home stranicu
      } catch (error) {
        // alert('login error: ' + e.message)
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          alert('Sisestatud parool on vale')
        } else {
          alert(errorMessage)
        }
      }
    }
  }
}
</script>
