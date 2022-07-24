import { api } from '@/axios'

const importantNote = () => api({ url: '/notification', method: 'get' })

const privateNotification = () => api({ url: '/notification/private', method: 'get' })
export { importantNote, privateNotification }
