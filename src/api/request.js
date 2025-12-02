import axios from 'axios'

class Request {
  constructor(config = {}) {
    this.instance = axios.create({
      baseURL: '/api',
      timeout: 10000,
      ...config,
    })

    this.instance.interceptors.request.use(
      (config) => {
        console.log('请求拦截器被触发')
        return config
      },
      (error) => {
        console.error('请求拦截器发生错误：', error)
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (response) => {
        console.log('响应拦截器被触发')
        return response.data
      },
      (error) => {
        console.error('响应拦截器发生错误：', error)
        return Promise.reject(error)
      },
    )
  }

  async request(config) {
    const response = await this.instance.request(config)
    return response
  }
}

export default function request(config) {
  const instance = new Request(config)
  return instance.request(config)
}
