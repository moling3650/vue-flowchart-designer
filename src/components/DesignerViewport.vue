<template>
  <div id="designer_viewport">
    <div id="designer_layout" :style="{ height }">
      <div :class="['node', 'output']" :style="{top: `${n.top}px`, left: `${n.left}px`}" v-for="n in nodes" :key="n.id">
        {{n.id}}
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/bus'

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
  },
  mounted () {
    bus.$on('fetchFlowDetail', detail => {
      this.nodes = detail.map(d => {
        return {
          id: d.process_from,
          top: d.top,
          left: d.left
        }
      })
    })
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
