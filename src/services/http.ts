import axios from 'axios'
import { message } from 'antd'
import { getToken, getUid, removeStoreByLogout } from 'utils/auth'
import { Env } from 'utils/index'

enum RES_CODE {
  Success = 0,
  InvalidToken = 20003,
}

export interface HttpRespData {
  data: any
  result: number
  rmsg: string
}

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

http.interceptors.request.use(
  async (config) => {
    const token = getToken() || ''
    const uid = getUid() || ''
    config.headers = {
      ...config.headers,
      ...{
        Authorization: token,
        uid,
      },
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (res) => {
    const respData: HttpRespData = res.data ?? {}
    const rmsg = respData.rmsg ?? ''
    switch (respData?.result) {
      case RES_CODE.Success: // 正常业务流程
        return respData?.data
      case RES_CODE.InvalidToken: // token失效
        message.error(rmsg)
        removeStoreByLogout()
        location.href = `${location.origin}${location.pathname}#/login`
        // location.reload()
        return Promise.reject(respData)
      default:
        message.error(respData?.data?.details?.[0] ?? respData?.rmsg)
        return Promise.reject(respData)
    }
  },
  (error) => {
    if (error.response) return Promise.reject(error.response.data)
    return Promise.reject(error.message)
  },
)

export default http
