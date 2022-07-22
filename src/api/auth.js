import { api } from '@/axios'

const login = (data) => api({ url: '/auth/login', data, method: 'post' })

const register = (data) => api({ url: '/auth/register', data, method: 'post' })

const session = () => api({ url: '/auth/session', method: 'get' })

const logout = () => api({ url: '/auth/session', method: 'delete' })

export { logout, session, register, login }
