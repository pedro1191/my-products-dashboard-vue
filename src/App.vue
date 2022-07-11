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
    <gws-update-notifier></gws-update-notifier>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import SessionRefresh from './components/SessionRefresh.vue';
import UpdateNotifier from './components/UpdateNotifier.vue';

export default {
  components: {
    gwsNavbar: Navbar,
    gwsSessionRefresh: SessionRefresh,
    gwsUpdateNotifier: UpdateNotifier,
  },
  created() {
    this.$store.dispatch('tryAutoLogin');
  },
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

.btn-insert {
  border-radius: 40px;
  font-weight: bold;
  padding: 0.375rem 1rem;
  color: #fff;
  background-color: #aa6e6d;
  border-color: #aa6e6d;
  white-space: nowrap;
}

.btn-insert:hover {
  color: #fff;
  background-color: #8e5c5b;
  border-color: #835554;
}

.btn-update {
  font-weight: bold;
  padding: 0.375rem 1rem;
  color: #000;
  background-color: #fac7b2;
  border-color: #fac7b2;
  white-space: nowrap;
}

.btn-update:hover {
  color: #000;
  background-color: #d2a795;
  border-color: #c09989;
}

.btn-delete {
  font-weight: bold;
  padding: 0.375rem 1rem;
  color: #000;
  background-color: #fc757b;
  border-color: #fc757b;
  white-space: nowrap;
}

.btn-delete:hover {
  color: #000;
  background-color: #d36267;
  border-color: #c25a5e;
}

.fade-in-enter-active {
  animation: fade-in 1s;
}
.fade-in-leave-active {
  animation: fade-in 1s reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
