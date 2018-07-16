<template>
  <div id="designer">
    <DesignerBar/>
    <ShapePanel :height="height" :group="group" ref="ShapePanel"/>
    <DesignerViewport :height="height" ref="DesignerViewport"/>
  </div>
</template>

<script>
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
      group: []
    }
  },
  mounted () {
    this.height = `${document.body.clientHeight}px`
    apis.fetchProcessGroup().then(group => {
      this.group = group
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
