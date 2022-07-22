import { defineStore } from 'pinia'
import { infoMe } from '@/api'
export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
    userInfoMe: JSON.parse(localStorage.getItem('userInfo')) || {},
    remember: localStorage.getItem('rememberLogin') || true
  }),
  getters: {
    userInfo(state) {
      return state.userInfoMe
    },
    userToken(state) {
      return state.token
    }
  },
  actions: {
    async setUserInfo() {
      let data = await infoMe()
      this.userInfoMe = data
      if (this.remember) {
        localStorage.setItem('userInfo', JSON.stringify(data))
      } else {
        sessionStorage.setItem('userInfo', JSON.stringify(data))
      }
    },
    setToken(payload) {
      this.token = payload.token
      if (this.remember) {
        localStorage.setItem('token', payload.token)
      } else {
        sessionStorage.setItem('token', payload.token)
      }
    },
    clearUser() {
      this.token = ''
      this.userInfoMe = {}
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('userInfo')
    }
  }
})
