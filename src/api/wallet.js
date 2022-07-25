import { api } from '@/axios'

const getOTP = (params, data) => api({ url: `/wallet/${params}/getOTP`, data, method: 'post' })

const confirmOTP = (params, data) => api({ url: `/wallet/${params}/confirmOTP`, data, method: 'post' })

const checkNameTranfer = (params, data) => api({ url: `/wallet/${params}/checkTranfer`, data, method: 'post' })

const tranferWallet = (params, data) => api({ url: `/wallet/${params}/tranfer`, data, method: 'post' })

export { getOTP, confirmOTP, tranferWallet, checkNameTranfer }
