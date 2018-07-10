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
  padding: 16px;
  position: absolute;
  z-index: 4;
  border: 1px solid #2e6f9a;
  box-shadow: 2px 2px 19px #e0e0e0;
  -o-box-shadow: 2px 2px 19px #e0e0e0;
  -webkit-box-shadow: 2px 2px 19px #e0e0e0;
  -moz-box-shadow: 2px 2px 19px #e0e0e0;
  -moz-border-radius: 8px;
  border-radius: 8px;
  opacity: 0.8;
  cursor: move;
  background-color: white;
  font-size: 11px;
  -webkit-transition: background-color 0.25s ease-in;
  -moz-transition: background-color 0.25s ease-in;
  transition: background-color 0.25s ease-in;
}

.node:hover {
  background-color: #5c96bc;
  color: white;
}

.aLabel {
  -webkit-transition: background-color 0.25s ease-in;
  -moz-transition: background-color 0.25s ease-in;
  transition: background-color 0.25s ease-in;
}

.aLabel.jtk-hover, .jtk-source-hover, .jtk-target-hover {
  background-color: #1e8151;
  color: white;
}

.aLabel {
  background-color: white;
  opacity: 0.8;
  padding: 0.3em;
  border-radius: 0.5em;
  border: 1px solid #346789;
  cursor: pointer;
}

.ep {
  position: absolute;
  bottom: 37%;
  right: 5px;
  width: 1em;
  height: 1em;
  background-color: orange;
  cursor: pointer;
  box-shadow: 0 0 2px black;
  -webkit-transition: -webkit-box-shadow 0.25s ease-in;
  -moz-transition: -moz-box-shadow 0.25s ease-in;
  transition: box-shadow 0.25s ease-in;
}

.ep:hover {
  box-shadow: 0 0 6px black;
}
</style>
