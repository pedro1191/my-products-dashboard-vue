<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">
      <gws-logo :customStyle="customLogoStyle"/>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <router-link class="nav-item" to="/" tag="li" active-class="active" exact>
          <a class="nav-link">Home</a>
        </router-link>
        <router-link class="nav-item" to="/about" tag="li" active-class="active">
          <a class="nav-link">About</a>
        </router-link>
        <router-link class="nav-item" to="/login" tag="li" active-class="active">
          <a class="nav-link">Login</a>
        </router-link>
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
      }
    }
  },
  components: {
    gwsLogo: Logo
  }
}
</script>
