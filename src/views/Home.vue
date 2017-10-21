<template>
  <main class="home-container">
    <h1 class="title">Home</h1>
    <c-button @click="accessAPI">Ir para a API</c-button>
  </main>
</template>

<script>
export default {
  methods: {
    accessAPI () {
      window.location = process.env.API
    }
  }
}
</script>

<style lang="scss">
  .home-container {
    & > .title {
      font-size: 3.8rm;
    }
  }
</style>
