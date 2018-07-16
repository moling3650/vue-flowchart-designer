<template>
  <div id="shape_panel" :style="{ height }">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="g in group" :key="g.group_code" :title="g.group_name" :name="g.group_code">
        <div class="p-item" v-for="p in g.processList" :key="p.process_code" ref="processes">{{p.process_code}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'ShapePanel',
  props: {
    height: {
      type: String,
      default: '500px'
    },
    group: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeName: ''
    }
  }
}
</script>

<style lang="css" scoped>
#shape_panel {
  width: 162px;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  background: #f6f6f6;
  border-right: 1px solid #a2a2a2;
}

.panel_container {
  padding: 10px 0;
  border-bottom: 1px solid #cbcccc;
  margin-top: 1px;
}

.p-item {
  border: 1px solid #2e6f9a;
  margin: 2px 10px;
  z-index: 4;
  border-radius: 8px;
  font-size: 12px;
  text-align: center;
  background-color: white;
  box-shadow: 2px 2px 19px #e0e0e0;
  opacity: 0.8;
  cursor: move;
  transition: background-color 0.25s ease-in;
}
.p-item:hover {
  background-color: #5c96bc;
  color: white;
}
</style>
