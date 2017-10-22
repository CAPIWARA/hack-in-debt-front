<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm10 md8>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Entrar</v-toolbar-title>
        </v-toolbar>

        <v-form @submit.prevent class="pa-3">
          <v-text-field
            label="E-Mail"
            type="email"
            v-model="email"
            :rules="rules.email"
            required />
          <v-text-field
            label="Senha"
            type="password"
            v-model="password"
            :rules="rules.password"
            :counter="10"
            required />

          <v-btn type="submit" color="primary" @click="submit">Entrar</v-btn>
          <v-btn :to="{ name: 'Cadastrar' }">Cadastrar</v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { email, password } from '@/helpers/rules'
  import * as types from '@store/types'

  export default {
    data () {
      return {
        rules: { email, password },
        email: '',
        password: ''
      }
    },
    methods: {
      async submit () {
        const { rules: _, ...data } = this.$data
        await this.$store.dispatch(types.AUTH_SIGNIN, data)
        this.$router.push({ name: 'Cadastrar' })
      },
      subscribe () {
        this.$router.push({ name: 'Cadastrar' })
      }
    }
  }
</script>

<style lang="scss">
  .content,
  .content > .container,
  .container > .card { height: 100% }
</style>
