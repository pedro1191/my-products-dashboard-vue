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
:root {
  --navbar-offset: 76px;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/fonts/Roboto-Regular.ttf');
}

@font-face {
  font-family: 'PatrickHand';
  src: url('./assets/fonts/PatrickHand-Regular.ttf');
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
}

h1 {
  font-family: PatrickHand, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
}

body {
  padding-top: var(--navbar-offset);
}
</style>
