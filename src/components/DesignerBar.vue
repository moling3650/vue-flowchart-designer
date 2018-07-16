<template>
  <div id="DesignerBar">
    <el-select :value="flowCode" filterable placeholder="请选择流程" @change="handleFlowChange">
      <el-option
        v-for="f in flowList"
        :key="f.flow_code"
        :label="f.flow_name"
        :value="f.flow_code">
      </el-option>
    </el-select>
    <el-button type="primary" @click="handleClick">保存</el-button>
  </div>
</template>

<script>
import apis from '@/apis/flowAPI'
import bus from '@/bus'

export default {
  name: 'DesignerBar',
  props: {
    flowCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      flowList: []
    }
  },
  methods: {
    handleFlowChange (flowCode) {
      apis.fetchDetailByFlowCode(flowCode).then(detail => {
        this.$emit('update:flowCode', flowCode)
        bus.$emit('fetchFlowDetail', detail)
      })
    },
    handleClick () {
      bus.$emit('saveFlowDetail')
    }
  },
  mounted () {
    apis.fetchProcessFlow().then(data => {
      this.flowList = data
    })
  }
}
</script>

<style lang="css" scoped>
#DesignerBar {
  position: relative;
  padding-left: 35px;
  background-color: #f3f3f3;
  border-top: 1px solid #cbcccc;
  height: 40px;
  font-size: 12px;
  min-width: 840px;
  -webkit-box-shadow: inset 0 1px 0 0 #fff;
  -moz-box-shadow: inset 0 1px 0 0 #fff;
  box-shadow: inset 0 1px 0 0 #fff;
  background-color: #f5f5f5;
  background-image: -webkit-linear-gradient(top,#f5f5f5,#eee);
  background-image: -moz-linear-gradient(top,#f5f5f5,#eee);
  background-image: -ms-linear-gradient(top,#f5f5f5,#eee);
  background-image: -o-linear-gradient(top,#f5f5f5,#eee);
  background-image: linear-gradient(top,#f5f5f5,#eee);
  border-bottom: 1px solid #aaaaaa;
}
</style>
