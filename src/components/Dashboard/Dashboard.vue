<template>
  <section>
    <v-navigation-drawer
      class="aside"
      app
      enable-resize-watcher
      persistent
    >

    </v-navigation-drawer>
    <main>
      <v-content>
        <v-container fluid fill-height>
          <v-layout
            justify-center
            align-center
          >
            <div v-for="(beneficio, index) in beneficios" :key="index">
              <h3 class="title">{{ beneficio.nome }}</h3>
              <img class="foto" :src="beneficio.foto" />
              <p class="custo">{{ beneficio.pontosNecessarios }} - {{ beneficio.tipoBeneficio }}</p>
            </div>
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </section>
</template>

<script>
import * as types from '@store/types'
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    estudante: types.STUDENT,
    beneficios: types.BENEFITS
  }),
  mounted () {
    this.$store.dispatch(types.BENEFITS)
  }
}
</script>

<style lang="scss">
  .aside {
    background-image: url('../../../static/pattern.png') repeat;
  }
</style>
