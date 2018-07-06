<template>
  <div id="designer">
    <ShapePanel :height="height" ref="ShapePanel"/>
    <DesignerViewport :height="height" ref="DesignerViewport"/>
  </div>
</template>

<script>
import { jsPlumb, jsPlumbUtil } from 'jsPlumb'
import ShapePanel from '@/components/ShapePanel'
import DesignerViewport from '@/components/DesignerViewport'

export default {
  name: 'Designer',
  components: {
    ShapePanel,
    DesignerViewport
  },
  data () {
    return {
      height: '600px',
      canDrop: false,
      jp: jsPlumb.getInstance()
    }
  },
  mounted () {
    this.height = `${document.body.clientHeight}px`
    this.jp.draggable(Object.values(this.$refs.ShapePanel.$refs), {
      clone: true,
      start: () => {
        this.canDrop = false
      },
      stop: ({el, finalPos: [posX, posY]}) => {
        if (this.canDrop) {
          const {x, y} = this.$refs.DesignerViewport.$el.getBoundingClientRect()
          this.$refs.DesignerViewport.addNode({
            id: jsPlumbUtil.uuid(),
            type: el.classList[1],
            top: `${posY - y}px`,
            left: `${posX - x}px`
          })
        }
      }
    })
    console.log(this.$refs.DesignerViewport)
    this.jp.droppable(this.$refs.DesignerViewport.$el, {
      drop: info => {
        this.canDrop = true
        return true
      }
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
