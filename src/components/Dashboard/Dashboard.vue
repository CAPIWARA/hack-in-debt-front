<template>
  <main>
    <v-navigation-drawer
      class="aside"
      app
      enable-resize-watcher
      persistent
    />

  </main>
</template>

<script>
import * as types from '@store/types'
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    student: types.STUDENT
  })
}
</script>

<style lang="scss">
  .aside {
    background-image: url('static/pattern.png') repeat;
  }
</style>
