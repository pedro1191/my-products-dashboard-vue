<template>
  <div class="hello">
    <h1>Welcome to the Generic Website Admin App</h1>
    <p>
      Here you can customize some files for the
      <a
        href="http://192.168.0.128:3001"
        target="_blank"
        rel="noopener"
      >Generic Website App</a>, like the images and the catalog.
    </p>
    <p>But you must
      <router-link to="/login">log in</router-link>first.
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld"
};
</script>
