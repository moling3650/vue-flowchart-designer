<template>
  <div id="designer">
    <DesignerBar/>
    <DesignerViewport :height="height" ref="DesignerViewport"/>
  </div>
</template>

<script>
import DesignerBar from '@/components/DesignerBar'
import DesignerViewport from '@/components/DesignerViewport'

export default {
  name: 'Designer',
  components: {
    DesignerBar,
    DesignerViewport
  },
  data () {
    return {
      height: '600px'
    }
  },
  mounted () {
    this.height = `${document.body.clientHeight}px`
  }
}
</script>

<style lang="css" scoped>
#designer {
  position: relative;
  width: 100%;
}
</style>
