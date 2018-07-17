<template>
  <div id="designer_viewport">
    <div id="designer_layout" :style="{ height }">
      <div class="node"
        :style="{top: `${n.top}px`, left: `${n.left}px`}"
        v-for="n in nodes"
        :key="n.process_from" :id="n.process_from" ref="nodes"
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
import bus from '@/bus'
import apis from '@/apis/flowAPI'
import { jsPlumb } from 'jsPlumb'

export default {
  name: 'DesignerViewport',
  props: {
    flowCode: {
      type: String,
      required: true
    },
    group: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  computed: {
    processGroupMap () {
      const processGroupMap = new Map()
      this.group.forEach(g => {
        g.processList.forEach(p => {
          processGroupMap.set(p.process_code, g.group_code)
        })
      })
      return processGroupMap
    }
  },
  data () {
    return {
      detail: [],
      nodes: [],
      jp: jsPlumb.getInstance({
        Endpoint: ['Dot', {radius: 1}],
        Connector: 'Flowchart',
        HoverPaintStyle: {stroke: '#1e8151', strokeWidth: 1},
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
      if (!this.flowCode) {
        return this.$message.error({ message: '请先选择工艺流程', showClose: true })
      }
      if (this.nodes.find(n => n.process_from === node.process_from)) {
        return this.$message.error({ message: '该工序已存在', showClose: true })
      }
      this.nodes.push(node)
      this.$nextTick(_ => {
        this.initNode(document.querySelector(`#${node.process_from}`))
      })
    },
    initNode (node) {
      this.jp.draggable(node, {
        containment: true,
        stop: ({ el, finalPos: [left, top] }) => {
          const node = this.nodes.find(n => n.process_from === el.id)
          if (node) {
            node.top = top
            node.left = left
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
      c.setData(this.getConnectionData(source, type))
      c.getOverlay('label').setLabel(type)
    },
    getConnectionData (sourceId, type) {
      const data = this.detail.find(d => d.process_from === sourceId && d.process_result === type) || {}
      return {
        pid: data.pid || null
      }
    },
    cleanJsPlumb () {
      this.jp.unmakeEverySource()
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
      this.$confirm('', '编辑连接', {
        distinguishCancelAndClose: true,
        confirmButtonText: '切换类型',
        cancelButtonText: '删除连接',
        cancelButtonClass: 'el-button--danger',
        type: 'warning'
      }).then(_ => {
        this.jp.getConnections({ source: c.sourceId }).map(conn => {
          const type = conn.getOverlay('label').label === 'OK' ? 'NG' : 'OK'
          conn.setType(type)
          conn.setData(this.getConnectionData(c.sourceId, type))
          conn.getOverlay('label').setLabel(type)
        })
      }).catch(action => {
        if (action === 'cancel') {
          this.jp.deleteConnection(c)
        }
      })
    })

    bus.$on('fetchFlowDetail', detail => {
      this.cleanJsPlumb()
      this.detail = detail
      const nodeMap = {}
      detail.forEach(d => {
        if (d.process_next !== 'END') {
          nodeMap[d.process_next] = {
            process_from: d.process_next,
            top: d.next_top,
            left: d.next_left
          }
        }
        nodeMap[d.process_from] = {
          process_from: d.process_from,
          top: d.from_top,
          left: d.from_left
        }
      })
      this.nodes = Object.values(nodeMap)

      this.$nextTick(_ => {
        this.jp.setSuspendDrawing(true)
        this.$refs.nodes.map(node => {
          this.initNode(node)
        })
        detail.map(node => {
          this.connect(node.process_from, node.process_next, node.process_result)
        })
        this.jp.setSuspendDrawing(false, true)
      })
    })

    bus.$on('saveFlowDetail', _ => {
      const cs = this.jp.getAllConnections()
      const detail = cs.map(c => {
        const data = c.getData()
        data.flow_code = this.flowCode
        data.process_from = c.sourceId
        data.process_next = c.targetId
        const { x: sourceX, y: sourceY } = document.getElementById(c.sourceId).getBoundingClientRect()
        const { x: targetX, y: targetY } = document.getElementById(c.targetId).getBoundingClientRect()
        const { x: containerX, y: containerY } = document.getElementById('designer_layout').getBoundingClientRect()
        data.from_top = sourceY - containerY
        data.from_left = sourceX - containerX
        data.next_top = targetY - containerY
        data.next_left = targetX - containerX
        data.process_result = c.getOverlay('label').label
        data.process_from_group = this.processGroupMap.get(c.sourceId)
        data.process_next_group = this.processGroupMap.get(c.targetId) || data.process_from_group
        return data
      })
      apis.updateFlowDetails(detail.filter(d => d.pid))
      apis.addFlowDetails(detail.filter(d => d.pid === null))
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
