import axios from 'axios'
import { networkConfig } from './networkConfig'
import { toast } from '../plugins/toast'
import router from '../router'

function requestService(config) {
  // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  const instance = axios.create({
    ...networkConfig,
    ...config,
    timeout: 10000
  })

  instance.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token') || sessionStorage.getItem('token') || ''
      if (token) {
        config.headers.authorization = 'Bearer ' + token
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (res) => {
      if (!res.data.success) {
        toast.danger(res.data.message)
        return Promise.reject(res.data.message)
      }
      return res.data.data
    },
    (error) => {
      if (error.response.status == 401) {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        sessionStorage.removeItem('userInfo')
        router.replace({ name: 'login' })
      } else {
        toast.danger(error.response.data.error.message)
      }
      return Promise.reject(error.response.data.error.message)
    }
  )
  return instance(config)
}

export function api(configs, headers, responseType) {
  return requestService({
    ...configs,
    headers,
    responseType: responseType == null || responseType == '' ? 'json' : responseType
  })
}
