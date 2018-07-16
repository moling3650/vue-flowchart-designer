import apis from '@/apis'

export default {
  fetchProcessFlow () {
    return apis.executeSQL('SELECT * FROM B_Process_Flow')
  },
  fetchDetailByFlowCode (fCode) {
    return apis.executeSQL('SELECT * FROM B_Process_Flow_Detail WHERE flow_code = @fCode', { fCode })
  },
  updatePositions (payload) {
    const sql = 'UPDATE B_Process_Flow_Detail SET [top] = @top, [left] = @left WHERE flow_code = @fCode AND process_from = @pCode'
    return apis.executeSQL(sql, payload)
  },
  toggleProcessResult (payload) {
    const sql = `UPDATE B_Process_Flow_Detail SET process_result = (CASE WHEN process_result = 'OK' THEN 'NG' ELSE 'OK' END)
      WHERE flow_code = @fCode AND process_from = @pCode`
    return apis.executeSQL(sql, payload)
  },
  fetchProcessGroup () {
    return apis.executeSQL('SELECT group_code, group_name FROM B_WorkGroup')
  },
  fetchProcessByGroup (gCode) {
    return apis.executeSQL('SELECT process_code, process_name FROM B_ProcessList WHERE group_code = @gCode', { gCode })
  }
}
