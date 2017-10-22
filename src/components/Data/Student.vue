<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm10 md8>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Entrar</v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-layout row wrap>
            <v-flex class="pa-3" xs12 md6>
              <v-text-field
                label="Nome"
                required
                v-model="nome"
                :rules="rules.required"
              />
            </v-flex>
            <v-flex class="pa-3" xs12 md6>
              <v-select
                label="Status do Pagamento"
                item-text="label"
                item-value="value"
                required
                v-model="statusPagamento"
                :rules="rules.cnpj"
                :items="items"
                :counter="14"
              />
            </v-flex>
            <v-flex class="pa-3" xs12 md6>
              <v-text-field
                label="Senha"
                type="password"
                required
                v-model="login.password"
                :rules="rules.password"
                :counter="8"
              />
            </v-flex>
            <v-flex class="pa-3" xs12 md6>
              <v-text-field
                label="Confirme sua senha"
                type="password"
                required
                v-model="confirmation"
                :rules="rules.confirmation"
                :counter="8"
              />
            </v-flex>
            <v-flex class="pa-3" xs12 md6>
              <v-text-field
                label="Telefone"
                mask="(##) #####-####"
                required
                v-model="telefone"
                :rules="rules.required"
              />
            </v-flex>
            <v-flex class="pa-3" xs12 md6>
              <v-text-field
                label="E-Mail"
                type="email"
                required
                v-model="login.email"
                :rules="rules.email"
              />
            </v-flex>
            <v-flex class="pa-3" xs4>
              <v-text-field
                label="Nível"
                type="number"
                required
                v-model="nivel"
                min="0"
                max="100"
                :rules="rules.required"
              />
            </v-flex>
            <v-flex class="pa-3" xs4>
              <v-text-field
                label="Ouro"
                type="number"
                required
                v-model="ouro"
                :rules="rules.required"
              />
            </v-flex>
            <v-flex class="pa-3" xs4>
              <v-text-field
                label="Gemas"
                type="number"
                required
                v-model="gemas"
                :rules="rules.required"
              />
            </v-flex>
          </v-layout>
          <v-btn color="primary" @click="submit">Adicionar</v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { required, email, password, cnpj } from '@/helpers/rules'
  import * as types from '@store/types'

  const items = [
    {
      label: 'Adiantado',
      value: 'PAGAMENTO_ADIANTADO'
    },
    {
      label: 'Okay',
      value: 'PAGAMENTO_OKAY'
    },
    {
      label: 'Atrasado',
      value: 'PAGAMENTO_ATRASADO'
    }
  ]

  export default {
    data () {
      return {
        items,
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
        statusPagamento: '',
        media: '',
        telefone: '',
        pesquisaCientifica: '',
        login: {
          email: '',
          password: ''
        },
        confirmation: '',
        nivel: 0,
        ouro: 0,
        gemas: 0
      }
    },
    methods: {
      async submit () {
        const { rules: _, confirmation: __, items: ___, ...data } = this.$data
        await this.$store.dispatch(types.STUDENTS_INCLUDE, data)
        this.clear()
      },
      clear () {
        this.nome = ''
        this.statusPagamento = ''
        this.media = ''
        this.telefone = ''
        this.pesquisaCientifica = ''
        this.login = {
          email: '',
          password: ''
        }
        this.confirmation = ''
        this.nivel = 0
        this.ouro = 0
        this.gemas = 0
        this.$validator.clean()
      }
    }
  }
</script>
