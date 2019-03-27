<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light fixed-top">
    <router-link class="navbar-brand" to="/">
      <gws-logo :customStyle="customLogoStyle"/> My Products
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      :aria-expanded="mobileNavbarOpen"
      aria-label="Toggle navigation"
      :class="{collapsed: !mobileNavbarOpen}"
      @click="onNavbarTogglerClick">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{show: mobileNavbarOpen}">
      <ul class="navbar-nav ml-auto">
        <router-link class="nav-item" to="/" tag="li" active-class="active" exact>
          <a class="nav-link">Home</a>
        </router-link>
        <router-link class="nav-item" to="/about" tag="li" active-class="active">
          <a class="nav-link">About</a>
        </router-link>
        <li class="nav-item dropdown" @click="onDropdownClick" :class="{show: dropdownOpen}" v-if="isAuthenticated">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="dropdownOpen">
            Manage
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown" :class="{show: dropdownOpen}">
            <router-link class="dropdown-item" to="/categories" active-class="active">Categories</router-link>
            <router-link class="dropdown-item" to="/products" active-class="active">Products</router-link>
          </div>
        </li>
        <router-link class="nav-item" to="/login" tag="li" active-class="active" v-if="!isAuthenticated">
          <a class="nav-link">Login</a>
        </router-link>
        <li class="nav-item" v-else>
          <button class="nav-link nav-link-button" @click="onLogout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  data () {
    return {
      customLogoStyle: {
        height: '50px'
      },
      dropdownOpen: false,
      mobileNavbarOpen: false
    }
  },
  components: {
    gwsLogo: Logo
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onNavbarTogglerClick () {
      this.mobileNavbarOpen = !this.mobileNavbarOpen
    },
    onDropdownClick () {
      this.dropdownOpen = !this.dropdownOpen
    },
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
.nav-link-button {
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  margin: auto;
}

.nav-item {
  text-align: center;
}
</style>
