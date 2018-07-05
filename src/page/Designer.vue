<template>
  <div id="designer">
    <ShapePanel :height="height"/>
    <DesignerViewport :height="height"/>
  </div>
</template>

<script>
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
      height: '600px'
    }
  },
  mounted () {
    this.height = document.body.clientHeight + 'px'
  }
}
</script>

<style lang="css" scoped>
#designer {
  position: relative;
  width: 100%;
}
</style>
