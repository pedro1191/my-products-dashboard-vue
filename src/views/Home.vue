<template>
  <div class="home">
    <h1>Welcome to the FoodClub Dashboard</h1>
    <p>
      Here you can manage the data for the
      <a :href="myFoodAppUrl" target="_blank" rel="noreferrer noopener">
        FoodClub
      </a>
      app.
    </p>
    <p>You can start by opening the <strong>Manage</strong> menu.</p>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
  data() {
    return {
      myFoodAppUrl: process.env.VUE_APP_DEFAULT_MYFOOD_APP_URL,
    };
  },
};
</script>

<style scoped>
.home {
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
}

h1 {
  margin: 1rem 0;
}
</style>
