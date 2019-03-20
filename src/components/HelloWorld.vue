<template>
  <div class="hello">
    <h1>Welcome to the Generic Website Dashboard App</h1>
    <p>
      Here you can customize the product information for the
      <a
        href="http://192.168.0.128:3001"
        target="_blank"
        rel="noopener"
      >Generic Website App</a>.
    </p>
    <p v-if="!isAuthenticated">But you must
      <router-link to="/login">log in</router-link> first.
    </p>
    <p v-else>You can start by opening the <strong>Manage</strong> menu.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
