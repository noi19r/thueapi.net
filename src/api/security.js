import { api } from '@/axios'

const qr2FA = () => api({ url: '/security/qrcode', method: 'get' })

const verify2FA = (data) => api({ url: '/security/verify2FA', data, method: 'post' })

export { qr2FA, verify2FA }
