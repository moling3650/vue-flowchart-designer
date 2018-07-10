<template>
  <div id="designer_viewport">
    <div id="designer_layout" :style="{ height }">
      <div :class="['node', n.type]" :style="{top: n.top, left: n.left}" v-for="n in nodes" :key="n.id"></div>
    </div>
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
      nodes: []
    }
  },
  methods: {
    addNode (node) {
      this.nodes.push(node)
    }
  }
}
</script>

<style lang="css" scoped>
#designer_viewport {
  position: relative;
  /*margin-left: 163px;*/
}

#designer_layout {
  position: relative;
  background: url(../assets/canvas_bg.jpg) repeat;
  overflow: scroll;
  z-index: 0;
}
.node {
  position: absolute;
}
</style>
