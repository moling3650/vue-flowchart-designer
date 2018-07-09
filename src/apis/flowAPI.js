import apis from '@/apis'

export default {
  fetchProcessFlow () {
    return apis.executeSQL('SELECT * FROM B_Process_Flow')
  },
  fetchDetailByFlowCode (fCode) {
    return apis.executeSQL('SELECT * FROM B_Process_Flow_Detail WHERE flow_code = @fCode', { fCode })
  }
}
