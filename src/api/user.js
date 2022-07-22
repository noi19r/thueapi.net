import { api } from '@/axios'

const infoMe = () => api({ url: '/user/me', method: 'get' })

const changePassword = (data) => api({ url: '/user/me', data, method: 'post' })

export { infoMe, changePassword }
