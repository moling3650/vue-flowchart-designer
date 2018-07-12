<template>
  <div id="designer_viewport">
    <div id="designer_layout" :style="{ height }">
      <div class="node"
        :style="{top: `${n.top}px`, left: `${n.left}px`}"
        v-for="n in nodes"
        :key="n.pid" :id="n.id" ref="nodes"
        @dblclick="editNode(n)">
        <div class="node-text">{{n.text}}</div>
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
    editNode (node) {
      node.text = 'ok'
    },
    addNode (node) {
      this.nodes.push(node)
    },
    initNode (node) {
      this.jp.draggable(node, {
        containment: true,
        stop: ({ el, finalPos: [left, top] }) => {
          const index = this.nodes.findIndex(node => node.id === el.id)
          if (~index) {
            this.nodes[index].top = top
            this.nodes[index].left = left
          }
        }
      })
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
    connect (source, target, type) {
      if (target.toUpperCase() !== 'END') {
        const c = this.jp.connect({
          source,
          target,
          detachable: false,
          type
        })
        c.getOverlay('label').setLabel(type)
      }
    },
    cleanJsPlumb () {
      this.jp.deleteEveryEndpoint()
    }
  },
  mounted () {
    this.jp.registerConnectionType('basic', { anchor: 'Continuous', connector: 'Flowchart' })
    this.jp.registerConnectionType('OK', { anchor: 'Continuous', connector: 'Flowchart', paintStyle: {stroke: '#67c23a'} })
    this.jp.registerConnectionType('NG', { anchor: 'Continuous', connector: 'Flowchart', paintStyle: {stroke: '#f56c6c'} })
    // 新增一条连接
    this.jp.bind('beforeDrop', ({connection: c}) => {
      if (this.jp.getConnections({ source: c.sourceId, target: c.targetId }).length) {
        this.$message.info('连接已存在')
        return false
      }
      this.$confirm('请选择流程类型', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'NG',
        confirmButtonClass: 'el-button--success',
        cancelButtonClass: 'el-button--danger',
        type: 'warning'
      }).then(_ => {
        this.connect(c.sourceId, c.targetId, 'OK')
      }).catch(action => {
        if (action === 'cancel') {
          this.connect(c.sourceId, c.targetId, 'NG')
        }
      })
      return false
    })
    // 编辑一个连接
    this.jp.bind('dblclick', c => {
      this.$confirm('', '编辑连接', {
        confirmButtonText: '切换类型',
        cancelButtonText: '删除连接',
        cancelButtonClass: 'el-button--danger',
        type: 'warning'
      }).then(_ => {
        const type = c.getOverlay('label').label === 'OK' ? 'NG' : 'OK'
        c.setType(type)
        c.getOverlay('label').setLabel(type)
      }).catch(action => {
        if (action === 'cancel') {
          this.jp.deleteConnection(c)
        }
      })
    })

    bus.$on('fetchFlowDetail', detail => {
      this.cleanJsPlumb()
      this.nodes = detail.map(d => {
        console.log(d)
        return {
          id: d.process_from,
          top: d.top,
          left: d.left,
          pid: d.pid,
          text: d.process_from
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

    bus.$on('saveFlowDetail', _ => {
      const detail = []
      this.nodes.map(node => {
        const cs = this.jp.getConnections({ source: node.id })
        if (cs.length) {
          cs.map(c => {
            detail.push({ source: c.sourceId, target: c.targetId, result: c.getOverlay('label').label })
          })
        } else {
          detail.push({ source: node.id, target: 'END', result: 'OK' })
        }
      })
      console.log(detail)
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
