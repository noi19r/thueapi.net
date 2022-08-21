import { api } from '@/axios'

const getTokenBank = (bankId) => api({ url: `/bank/${bankId}/token`, method: 'get' })

const bankAccount = (params) => api({ url: `/bank/${params}`, method: 'get' })

const createBankAccount = (params, data) => api({ url: `/bank/${params}`, data, method: 'post' })

const updateBankAccount = (bankId, data) => api({ url: `/bank/${bankId}`, data, method: 'patch' })

const deleteBankAccount = (bankId) => api({ url: `/bank/${bankId}`, method: 'delete' })

const transaction = (params, data) => api({ url: `/bank/${params}/transaction`, data, method: 'get' })

const lastTransaction = () => api({ url: '/bank/lastTransaction', method: 'get' })

export {
  bankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
  transaction,
  lastTransaction,
  getTokenBank
}
