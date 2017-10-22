<template>
  <v-form>
    <v-text-field
      label="Nome"
      required
      v-model="nome"
      :rules="rules.required"
    />
    <v-text-field
      label="CNPJ"
      mask="##.###.###/####-##"
      required
      v-model="cnpj"
      :rules="rules.cnpj"
      :counter="14"
    />
    <v-text-field
      label="Telefone"
      mask="(##) #####-####"
      required
      v-model="telefone"
      :rules="rules.required"
    />
    <v-text-field
      label="Senha"
      type="password"
      required
      v-model="login.password"
      :rules="rules.password"
      :counter="8"
    />
    <v-text-field
      label="Confirme sua senha"
      type="password"
      required
      v-model="confirmation"
      :rules="rules.confirmation"
      :counter="8"
    />
    <v-text-field
      label="E-Mail"
      type="email"
      required
      v-model="login.email"
      :rules="rules.email"
    />
    <v-text-field
      label="Foto"
      v-model="foto"
    />
    <v-text-field
      label="Site"
      v-model="site"
    />
    <v-text-field
      label="Endereço"
      required
      v-model="endereco"
      :rules="rules.required"
    />
    <v-btn color="primary" @click="submit">Cadastrar</v-btn>
    <v-btn :to="{ name: 'Entrar' }">Entrar</v-btn>
  </v-form>
</template>

<script>
  import { required, email, password, cnpj } from '@/helpers/rules'
  import * as types from '@store/types'

  export default {
    data () {
      return {
        rules: {
          required,
          email,
          password,
          cnpj,
          confirmation: [
            (confirmation) => {
              const isEquals = confirmation.length && confirmation === this.login.password
              return isEquals || 'Senha e confirmação de senha não coincidem'
            }
          ]
        },
        nome: '',
        cnpj: '',
        telefone: '',
        foto: '',
        site: '',
        endereco: '',
        login: {
          email: '',
          password: ''
        },
        confirmation: ''
      }
    },
    methods: {
      async submit () {
        const { rules: _, confirmation: __, ...data } = this.$data
        await this.$store.dispatch(types.AUTH_SIGNUP, data)
        this.$router.push({ name: 'Entrar' })
      }
    }
  }
</script>
