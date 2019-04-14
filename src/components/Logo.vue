<template>
  <img alt="My Food" :src="gwsLogo" :style="customStyle">
</template>

<script>
import gwsLogo from '@/assets/whiteLogo.png';

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
