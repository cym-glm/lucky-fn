import { defineStore } from 'pinia'

export const useSystem = defineStore('system', {
  state() {
    return {
      isMobile: false,
      isChrome: true,
    }
  },
  getters: {
    getIsMobile(state) {
      return state.isMobile
    },
    getIsChrome(state) {
      return state.isChrome
    },
  },
  actions: {
    setIsMobile(isMobile) {
      this.isMobile = isMobile
    },
    setIsChrome(isChrome) {
      this.isChrome = isChrome
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
      },
    ],
  },
})
