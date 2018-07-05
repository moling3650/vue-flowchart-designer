<template>
  <div id="app">
    <Designer/>
  </div>
</template>

<script>
import Designer from '@/page/Designer'

export default {
  name: 'App',
  components: {
    Designer
  }
}
</script>

<style>
body, html {
  height: 100%;
  margin: 0;
  font: normal 13px arial,Microsoft Yahei!important;
  color: #000;
  background: #f0f0f0;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
div, input, textarea, ul {
  resize: none;
  outline: 0;
  font-size: inherit;
}
</style>
