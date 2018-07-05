<template>
  <div id="shape_panel" :style="{ height }">
    <div class="panel_container">
      <div class="node start"></div>
    </div>
    <div class="panel_container">
      <div class="node question"></div>
    </div>
    <div class="panel_container">
      <div class="node action"></div>
    </div>
    <div class="panel_container">
      <div class="node output"></div>
    </div>
  </div>
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

.panel_container {
  padding: 10px 0;
  border-bottom: 1px solid #cbcccc;
  margin-top: 1px;
}
</style>
