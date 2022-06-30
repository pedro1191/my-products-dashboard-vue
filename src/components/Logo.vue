<template>
  <img alt="FoodClub" :src="gwsLogo" :style="customStyle">
</template>

<script>
import gwsLogo from '@/assets/logo.png';

export default {
  data() {
    return {
      gwsLogo
    };
  },
  props: {
    customStyle: Object
  }
};
</script>
