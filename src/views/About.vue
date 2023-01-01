<template>
  <div class="about">
    <h1>FoodClub Dashboard</h1>
    <p><strong>Version:</strong> 1.0.0</p>
    <p>
      This is a Progressive Web Application built using Vue.js that works as a
      dashboard for the
      <a :href="myFoodAppUrl" target="_blank" rel="noreferrer noopener">
        FoodClub
      </a>
      application. It consumes a
      <a
        class="text-danger"
        href="https://github.com/pedro1191/my-products-dashboard-rest.git"
        target="_blank"
        rel="noreferrer noopener"
      >
        REST API
      </a>
      where the administrator can log in and manage the categories and items.
      The "theme" chosen here relates to culinary, but it could have been
      anything else.
    </p>
    <p>
      Please refer to the
      <a
        href="https://github.com/pedro1191/my-products-dashboard-vue.git"
        target="_blank"
        rel="noreferrer noopener"
      >
        source code <font-awesome-icon icon="fa-code" />
      </a>
      for documentation and technical details.
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppAbout',
  data() {
    return {
      myFoodAppUrl: process.env.VUE_APP_DEFAULT_MYFOOD_APP_URL,
    };
  },
};
</script>

<style scoped>
.about {
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
}

h1 {
  margin: 1rem 0;
}
</style>
