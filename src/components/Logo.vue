<template>
  <img alt="GWS logo" :src="gwsLogo" :style="customStyle">
</template>

<script>
import gwsLogo from "@/assets/greenLogo.png";

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