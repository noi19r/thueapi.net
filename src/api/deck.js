import { api } from '@/axios'

const deckList = () => api({ url: `/deck/list`, method: 'get' })

const deckUpgrade = (data) => api({ url: `/deck/upgrade`, data, method: 'post' })

const deckExtend = (bankId, data) => api({ url: `/deck/${bankId}`, data, method: 'post' })

export { deckList, deckUpgrade, deckExtend }
