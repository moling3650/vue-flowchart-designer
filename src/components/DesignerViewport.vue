<template>
  <div id="designer_viewport">
    <div id="designer_layout" :style="{ height }">
      <div class="node" :style="{top: `${n.top}px`, left: `${n.left}px`}" v-for="n in nodes" :key="n.id" :id="n.id" ref="nodes">
        <div class="node-text">{{n.id}}</div>
        <div class="ep"></div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/bus'
import { jsPlumb } from 'jsPlumb'

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
      nodes: [],
      jp: jsPlumb.getInstance({
        Endpoint: ['Dot', {radius: 2}],
        Connector: 'Flowchart',
        HoverPaintStyle: {stroke: '#1e8151', strokeWidth: 2},
        ConnectionOverlays: [
          ['Arrow', {
            location: 1,
            id: 'arrow',
            length: 14,
            foldback: 0.8
          }],
          ['Label', { label: 'default', id: 'label', cssClass: 'alabel' }]
        ],
        Container: 'designer_viewport'
      })
    }
  },
  methods: {
    addNode (node) {
      this.nodes.push(node)
    },
    initNode (node) {
      this.jp.draggable(node, { containment: true })
      this.jp.makeSource(node, {
        filter: '.ep',
        anchor: 'Continuous',
        connectorStyle: { stroke: '#5c96bc', strokeWidth: 2, outlineStroke: 'transparent', outlineWidth: 4 },
        connectionType: 'basic',
        extract: {
          action: 'the-action'
        },
        maxConnections: 2,
        onMaxConnections: function (info, e) {
          alert(`Maximum connections (${info.maxConnections}) reached`)
        }
      })

      this.jp.makeTarget(node, {
        dropOptions: { hoverClass: 'dragHover' },
        anchor: 'Continuous',
        allowLoopback: false
      })
    },
    connect (source, target, label) {
      if (target.toUpperCase() !== 'END') {
        const c = this.jp.connect({
          source,
          target,
          detachable: false,
          type: 'basic'
        })
        c.getOverlay('label').setLabel(label)
      }
    },
    cleanJsPlumb () {
      this.jp.deleteEveryEndpoint()
    }
  },
  mounted () {
    this.jp.registerConnectionType('basic', { anchor: 'Continuous', connector: 'Flowchart' })
    this.jp.bind('beforeDrop', info => {
      console.log(info)
    })
    bus.$on('fetchFlowDetail', detail => {
      this.cleanJsPlumb()
      this.nodes = detail.map(d => {
        return {
          id: d.process_from,
          top: d.top,
          left: d.left
        }
      })
      this.$nextTick(_ => {
        this.$refs.nodes.map(node => {
          this.initNode(node)
        })
        detail.map(node => {
          this.connect(node.process_from, node.process_next, node.process_result)
        })
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
</style>
