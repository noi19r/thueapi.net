import { api } from '@/axios'

const infoMe = () => api({ url: '/user/me', method: 'get' })

const deleteUser = () => api({ url: '/user/me', method: 'delete' })
const changePassword = (data) => api({ url: '/user/me', data, method: 'post' })

const updateTelegram = (data) => api({ url: '/user/me', data, method: 'patch' })

export { infoMe, changePassword, updateTelegram, deleteUser }
