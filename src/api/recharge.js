import { api } from '@/axios'

const rechargeSyntax = () => api({ url: '/recharge/syntax', method: 'get' })

const rechargeHistory = () => api({ url: '/recharge/histories', method: 'get' })

export { rechargeSyntax, rechargeHistory }
