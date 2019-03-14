<template>
  <div class="home">
    <img class="gws-logo" alt="GWS logo" src="../assets/greenLogo.png">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.gws-logo {
  max-height: 250px;
}
</style>
