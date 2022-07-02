<template>
  <img alt="FoodClub" :src="gwsLogo" :style="customStyle" />
</template>

<script>
import gwsLogo from '@/assets/logo.png';

export default {
  name: 'AppLogo',
  props: {
    customStyle: Object,
  },
  data() {
    return {
      gwsLogo,
    };
  },
};
</script>
