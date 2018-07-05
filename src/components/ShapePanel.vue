<template>
  <div id="shape_panel" :style="{ height }"></div>
</template>

<script>
export default {
  name: 'ShapePanel',
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
#shape_panel {
  width: 162px;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  background: #f6f6f6;
  border-right: 1px solid #a2a2a2;
}
</style>
