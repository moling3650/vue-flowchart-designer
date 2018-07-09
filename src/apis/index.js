import axios from 'axios'

const request = axios.create({
  timeout: 1000
})

request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
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
