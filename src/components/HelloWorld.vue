<template>
  <div class="hello">
    <h1>Welcome to the FoodClub Dashboard</h1>
    <p>
      Here you can customize some data for the
      <a :href="myFoodAppUrl" target="_blank" rel="noreferrer noopener">FoodClub</a> app.
    </p>
    <p v-if="!isAuthenticated">But you must
      <router-link to="/login">log in</router-link> first.
    </p>
    <p v-else>You can start by opening the <strong>Manage</strong> menu.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myFoodAppUrl: process.env.VUE_APP_DEFAULT_MYFOOD_APP_URL
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 1rem 0;
}
</style>
