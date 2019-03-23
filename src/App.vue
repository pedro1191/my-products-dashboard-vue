<template>
  <div id="app">
    <gws-header></gws-header>
    <div class="container">
      <div class="row">
        <div class="col">
          <router-view/>
        </div>
      </div>
    </div>
    <gws-session-refresh></gws-session-refresh>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SessionRefresh from '@/components/SessionRefresh.vue'

export default {
  components: {
    gwsHeader: Header,
    gwsSessionRefresh: SessionRefresh
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  padding-top: 76px;
}
</style>
