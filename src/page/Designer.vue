<template>
  <div id="designer">
    <DesignerBar :flowCode.sync="flowCode"/>
    <ShapePanel :height="height" :group="group" ref="ShapePanel"/>
    <DesignerViewport :flowCode="flowCode" :group="group" :height="height" ref="DesignerViewport"/>
  </div>
</template>

<script>
import { jsPlumb } from 'jsPlumb'
import apis from '@/apis/flowAPI'
import DesignerBar from '@/components/DesignerBar'
import ShapePanel from '@/components/ShapePanel'
import DesignerViewport from '@/components/DesignerViewport'

export default {
  name: 'Designer',
  components: {
    DesignerBar,
    ShapePanel,
    DesignerViewport
  },
  data () {
    return {
      height: '600px',
      group: [],
      canDrop: false,
      jp: jsPlumb.getInstance(),
      flowCode: ''
    }
  },
  mounted () {
    this.height = `${document.body.clientHeight}px`
    apis.fetchProcessGroup().then(group => {
      this.group = group
      this.$nextTick(_ => {
        this.jp.draggable(document.querySelectorAll('.p-item'), {
          clone: true,
          start: () => {
            this.canDrop = false
          },
          stop: ({el, finalPos: [posX, posY]}) => {
            if (this.canDrop) {
              const {x, y} = this.$refs.DesignerViewport.$el.getBoundingClientRect()
              this.$refs.DesignerViewport.addNode({
                process_from: el.innerHTML,
                top: posY - y,
                left: posX - x
              })
            }
          }
        })
        this.jp.droppable(this.$refs.DesignerViewport.$el, {
          drop: info => {
            this.canDrop = true
            return true
          }
        })
      })
    })
  }
}
</script>

<style lang="css" scoped>
#designer {
  position: relative;
  width: 100%;
}
</style>
