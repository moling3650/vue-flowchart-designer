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
  position: absolute;
  width: 100px;
  padding: 16px;
  border: 1px solid #2e6f9a;
  z-index: 4;
  box-shadow: 2px 2px 19px #e0e0e0;
  border-radius: 8px;
  font-size: 11px;
  background-color: white;
  opacity: 0.8;
  cursor: move;
  transition: background-color 0.25s ease-in;
}

.node:hover {
  background-color: #5c96bc;
  color: white;
}
.node-text {
  width: 100px;
  margin-right: 10px;
}

.alabel {
  transition: background-color 0.25s ease-in;
}

.alabel.jtk-hover, .jtk-source-hover, .jtk-target-hover {
  background-color: #1e8151;
  color: white;
}

.alabel {
  background-color: white;
  opacity: 0.8;
  padding: 0.3em;
  border-radius: 0.5em;
  border: 1px solid #346789;
  cursor: pointer;
}

.ep {
  position: absolute;
  bottom: 37%;
  right: 5px;
  width: 1em;
  height: 1em;
  background-color: orange;
  cursor: pointer;
  box-shadow: 0 0 2px black;
  transition: box-shadow 0.25s ease-in;
}

.ep:hover {
  box-shadow: 0 0 6px black;
}
</style>
