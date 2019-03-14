<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Here you can customize some files in the <a href="http://192.168.0.128:3001" target="_blank" rel="noopener">Generic Website App</a>, like the images and the catalog.
    </p>
    <p>
      But you must <router-link to="/login">log in</router-link> first.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: "Welcome to the Admin App for the Generic Website App"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
