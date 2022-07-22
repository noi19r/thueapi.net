import { api } from '@/axios'

const bankAccount = (params) => api({ url: `/bank/${params}`, method: 'get' })

const createBankAccount = (params, data) => api({ url: `/bank/${params}`, data, method: 'post' })

const updateBankAccount = (bankId, data) => api({ url: `/bank/${bankId}`, data, method: 'patch' })

const deleteBankAccount = (bankId, data) => api({ url: `/bank/${bankId}`, data, method: 'delete' })

const transaction = (params, data) => api({ url: `/bank/${params}/transaction`, data, method: 'get' })

export { bankAccount, createBankAccount, updateBankAccount, deleteBankAccount, transaction }
