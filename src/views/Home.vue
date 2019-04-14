<template>
  <div class="home">
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
  components: {
    helloWorld: HelloWorld
  }
};
</script>

<style scoped>
.home {
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
}
</style>
