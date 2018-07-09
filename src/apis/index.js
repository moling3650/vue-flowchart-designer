import axios from 'axios'

const request = axios.create({
  timeout: 1000
})

export default {
  executeSQL (sql, params = null) {
    return request.post('/DataAPI/ReportData.ashx?method=executeQuery', {
      query: sql,
      queryParams: params,
      isProcedure: false
    })
  }
}
