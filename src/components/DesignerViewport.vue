<template>
  <div id="designer_viewport">
    <div id="designer_layout" :style="{ height }"></div>
  </div>
</template>

<script>
export default {
  name: 'DesignerViewport',
  props: {
    height: {
      type: String,
      default: '500px'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="css" scoped>
#designer_viewport {
  position: relative;
  margin-left: 163px;
}

#designer_layout {
    position: relative;
    background: url(../assets/canvas_bg.jpg) repeat;
    overflow: scroll;
    z-index: 0;
}
</style>
