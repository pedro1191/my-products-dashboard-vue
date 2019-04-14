<template>
  <div id="app">
    <gws-navbar></gws-navbar>

    <div class="container">
      <div class="row">
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>

    <gws-session-refresh></gws-session-refresh>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import SessionRefresh from './components/SessionRefresh.vue';

export default {
  components: {
    gwsNavbar: Navbar,
    gwsSessionRefresh: SessionRefresh
  },
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  padding-top: 76px;
}
</style>
