<template>
  <div id="designer_viewport">
    <div id="designer_layout" :style="{ height }">
      <div class="node"
        :style="{top: `${n.top}px`, left: `${n.left}px`}"
        v-for="n in nodes"
        :key="n.pid" :id="n.process_from" ref="nodes"
        @dblclick="editNode(n)">
        <div class="node-text">{{n.process_from}}</div>
        <div class="ep"></div>
      </div>

      <div class="node" style="bottom: 50px; right: 20px;" id="END">
        <div class="node-text">结束</div>
      </div>
    </div>
  </div>
</template>

<script>
import apis from '@/apis/flowAPI'
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
          const node = this.nodes.find(n => n.process_from === el.id)
          if (node) {
            apis.updatePositions({
              fCode: node.flow_code,
              pCode: node.process_from,
              top,
              left
            }).then(_ => {
              node.top = top
              node.left = left
            })
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
        onMaxConnections: (info, e) => {
          this.$message.error('最多只能有两种流程（OK或NG）')
        }
      })

      this.jp.makeTarget(node, {
        dropOptions: { hoverClass: 'dragHover' },
        anchor: 'Continuous',
        allowLoopback: false
      })
    },
    connect (source, target, type) {
      const c = this.jp.connect({
        detachable: false,
        source,
        target,
        type
      })
      c.getOverlay('label').setLabel(type)
    },
    cleanJsPlumb () {
      this.jp.deleteEveryEndpoint()
    }
  },
  mounted () {
    this.jp.registerConnectionType('basic', { anchor: 'Continuous', connector: 'Flowchart' })
    this.jp.registerConnectionType('OK', { anchor: 'Continuous', connector: 'Flowchart', paintStyle: {stroke: '#67c23a'} })
    this.jp.registerConnectionType('NG', { anchor: 'Continuous', connector: 'Flowchart', paintStyle: {stroke: '#f56c6c'} })
    this.jp.makeTarget('END', {
      dropOptions: { hoverClass: 'dragHover' },
      anchor: 'Continuous',
      allowLoopback: false
    })
    // 新增一条连接
    this.jp.bind('beforeDrop', ({connection: c}) => {
      if (this.jp.getConnections({ source: c.sourceId, target: c.targetId }).length) {
        this.$message.info('连接已存在')
        return false
      }
      const connections = this.jp.getConnections({ source: c.sourceId })
      if (connections.length === 0) {
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
      } else if (connections.length === 1) {
        const type = connections[0].getOverlay('label').label === 'OK' ? 'NG' : 'OK'
        this.connect(c.sourceId, c.targetId, type)
      }
      return false
    })
    // 编辑一个连接
    this.jp.bind('dblclick', c => {
      const node = this.nodes.find(n => n.process_from === c.sourceId)
      this.$confirm('', '编辑连接', {
        confirmButtonText: '切换类型',
        cancelButtonText: '删除连接',
        cancelButtonClass: 'el-button--danger',
        type: 'warning'
      }).then(_ => {
        apis.toggleProcessResult({
          fCode: node.flow_code,
          pCode: node.process_from
        }).then(_ => {
          this.jp.getConnections({ source: c.sourceId }).map(conn => {
            const type = conn.getOverlay('label').label === 'OK' ? 'NG' : 'OK'
            conn.setType(type)
            conn.getOverlay('label').setLabel(type)
          })
        })
      }).catch(action => {
        if (action === 'cancel') {
          this.jp.deleteConnection(c)
        }
      })
    })

    bus.$on('fetchFlowDetail', detail => {
      this.cleanJsPlumb()
      this.rawData = detail
      const processSet = new Set(detail.map(d => d.process_from))
      this.nodes = Array.from(processSet).map(p => detail.find(d => d.process_from === p))

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
      const cs = this.jp.getAllConnections()
      console.log(cs)
    })
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
