import axios from 'axios'

export interface HttpRespData {
  data: any
  result: number
  rmsg: string
}

const http = axios.create({
  headers: {
    version: '9.9.9', // tang wen wen shuo de
  },
})

http.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (res) => {
    const respData: HttpRespData = res.data
    if (respData.result === 0) {
      return respData.data
    }
    return Promise.reject(respData)
  },
  (error) => {
    if (error.response) return Promise.reject(error.response.data)
    return Promise.reject(error.message)
  },
)

export default http
