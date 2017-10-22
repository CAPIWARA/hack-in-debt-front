<template>
  <v-app dark>
    <main>
      <v-content>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<style lang="scss">
  input[type="number"]::-webkit-inner-spin-button {
    display: none;
  }
</style>
