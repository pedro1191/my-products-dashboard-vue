<template>
  <img alt="My Products logo" :src="gwsLogo" :style="customStyle">
</template>

<script>
import gwsLogo from '@/assets/blueLogo.png'

export default {
  data () {
    return {
      gwsLogo
    }
  },
  props: {
    customStyle: Object
  }
}
</script>
