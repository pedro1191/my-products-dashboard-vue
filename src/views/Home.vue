<template>
  <div class="home">
    <gws-logo :customStyle="customLogoStyle"/>
    <hello-world/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Logo from '@/components/Logo.vue'

export default {
  name: 'home',
  data () {
    return {
      customLogoStyle: {
        maxHeight: '150px'
      }
    }
  },
  components: {
    helloWorld: HelloWorld,
    gwsLogo: Logo
  }
}
</script>

<style scoped>
.home {
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
}
</style>
