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
.node {
  border: 1px solid #333;
  margin: 0 auto;
}
.start {
  width: 100px;
  height: 70px;
  border-radius: 50%;
}
.question {
  width: 50px;
  height: 50px;
  transform: rotate(-45deg);
}
.action {
  width: 120px;
  height: 120px;
}
.output {
  width: 100px;
  height: 50px;
}
</style>
