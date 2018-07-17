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
  fetchWorkGroup () {
    return apis.executeSQL('SELECT group_code, group_name FROM B_WorkGroup')
  },
  fetchProcessList () {
    return apis.executeSQL('SELECT group_code, process_code, process_name FROM B_ProcessList ORDER BY idx')
  },
  fetchProcessGroup () {
    return Promise.all([this.fetchWorkGroup(), this.fetchProcessList()]).then(([group, processList]) => {
      group.forEach(g => {
        g.processList = processList.filter(p => p.group_code === g.group_code)
      })
      return group
    })
  },
  addFlowDetails (details) {
    if (!details.length) {
      return
    }
    const fields = Object.keys(details[0]).filter(k => k !== 'pid')
    const payload = {}
    let sql = `INSERT INTO B_Process_Flow_Detail(${fields.map(f => `[${f}]`).join(', ')}) VALUES `
    details.forEach((item, idx) => {
      sql += `(${fields.map(f => `@${f}${idx}`).join(', ')}),`
      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'pid') {
          payload[`${key}${idx}`] = value
        }
      })
    })
    return apis.executeSQL(sql.slice(0, sql.length - 1), payload)
  },
  updateFlowDetails (details) {
    if (!details.length) {
      return
    }
    const fields = Object.keys(details[0]).filter(k => k !== 'pid')
    const payload = {}
    let sql = ''
    details.forEach((item, idx) => {
      sql += `UPDATE B_Process_Flow_Detail SET ${fields.map(f => `[${f}] = @${f}${idx}`).join(', ')} WHERE pid = @pid${idx};`
      Object.entries(item).forEach(([key, value]) => {
        payload[`${key}${idx}`] = value
      })
    })
    return apis.executeSQL(sql, payload)
  },
  deleteFlowDetails (pids) {
    if (!pids.length) {
      return
    }
    const payload = {}
    const sql = `DELETE B_Process_Flow_Detail WHERE pid IN (${pids.map((pid, idx) => {
      payload[`pid${idx}`] = pid
      return `@pid${idx}`
    }).join(', ')})`
    return apis.executeSQL(sql, payload)
  }
}
