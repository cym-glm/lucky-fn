import { defineStore } from 'pinia'
import { defaultCurrentPrize, defaultPrizeList } from './data'

export const usePrizeConfig = defineStore('prize', {
  state() {
    return {
      prizeConfig: {
        prizeList: defaultPrizeList,
        currentPrize: defaultCurrentPrize,
        temporaryPrize: {
          id: '',
          name: '',
          sort: 0,
          isAll: false,
          count: 1,
          isUsedCount: 0,
          picture: { id: '-1', name: '', url: '' },
          separateCount: { enable: true, countList: [] },
          desc: '',
          isShow: false,
          isUsed: false,
          frequency: 1,
        },
      },
    }
  },
  getters: {
    getPrizeConfigAll(state) { return state.prizeConfig },
    getPrizeConfig(state) { return state.prizeConfig.prizeList },
    getPrizeConfigById(state) { return (id) => state.prizeConfig.prizeList.find(item => item.id === id) },
    getCurrentPrize(state) { return state.prizeConfig.currentPrize },
    getTemporaryPrize(state) { return state.prizeConfig.temporaryPrize },
  },
  actions: {
    setPrizeConfig(prizeList) { this.prizeConfig.prizeList = prizeList },
    addPrizeConfig(prizeConfigItem) { this.prizeConfig.prizeList.push(prizeConfigItem) },
    deletePrizeConfig(prizeConfigItemId) { this.prizeConfig.prizeList = this.prizeConfig.prizeList.filter(item => item.id !== prizeConfigItemId) },
    updatePrizeConfig(prizeConfigItem) {
      const prizeListLength = this.prizeConfig.prizeList.length
      if (prizeConfigItem.isUsed && prizeListLength) {
        for (let i = 0; i < prizeListLength; i++) {
          if (!this.prizeConfig.prizeList[i].isUsed) {
            this.setCurrentPrize(this.prizeConfig.prizeList[i])
            break
          }
        }
      } else { return }
      this.resetTemporaryPrize()
    },
    deleteAllPrizeConfig() { this.prizeConfig.prizeList = [] },
    setCurrentPrize(prizeConfigItem) { this.prizeConfig.currentPrize = prizeConfigItem },
    setTemporaryPrize(prizeItem) {
      if (prizeItem.isShow === false) {
        for (let i = 0; i < this.prizeConfig.prizeList.length; i++) {
          if (this.prizeConfig.prizeList[i].isUsed === false) {
            this.setCurrentPrize(this.prizeConfig.prizeList[i])
            break
          }
        }
        this.resetTemporaryPrize()
        return
      }
      this.prizeConfig.temporaryPrize = prizeItem
    },
    resetTemporaryPrize() {
      this.prizeConfig.temporaryPrize = {
        id: '', name: '', sort: 0, isAll: false, count: 1, isUsedCount: 0,
        picture: { id: '-1', name: '', url: '' },
        separateCount: { enable: true, countList: [] },
        desc: '', isShow: false, isUsed: false, frequency: 1,
      }
    },
    resetDefault() {
      this.prizeConfig = {
        prizeList: defaultPrizeList,
        currentPrize: defaultCurrentPrize,
        temporaryPrize: {
          id: '', name: '', sort: 0, isAll: false, count: 1, isUsedCount: 0,
          picture: { id: '-1', name: '', url: '' },
          separateCount: { enable: true, countList: [] },
          desc: '', isShow: false, isUsed: false, frequency: 1,
        },
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, key: 'prizeConfig' },
    ],
  },
})
