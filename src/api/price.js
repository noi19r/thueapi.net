import { api } from '@/axios'

const priceList = () => api({ url: `/price/list`, method: 'get' })

export { priceList }
