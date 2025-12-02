import { defineStore } from 'pinia'
import { positionsToCards } from '@/utils/positions'

export const usePositionConfig = defineStore('position', {
  state() {
    return {
      positionConfig: {
        allPositionList: positionsToCards(),
        alreadyPositionList: [],
      },
    }
  },
  getters: {
    getAllPositionList(state) { return state.positionConfig.allPositionList },
    getAlreadyPositionList(state) { return state.positionConfig.alreadyPositionList },
    getNotPositionList(state) { return state.positionConfig.allPositionList.filter(item => item.isWin === false) },
  },
  actions: {
    addAlreadyPositionList(positionList) {
      if (positionList.length <= 0) return
      positionList.forEach((position) => {
        this.positionConfig.allPositionList = this.positionConfig.allPositionList.map((item) => {
          if (item.id === position.id) {
            item.isWin = true
          }
          return item
        })
        this.positionConfig.alreadyPositionList.push(position)
      })
    },
    reset() {
      this.positionConfig = { allPositionList: positionsToCards(), alreadyPositionList: [] }
    },
    clearResults() {
      this.positionConfig.allPositionList = this.positionConfig.allPositionList.map((item) => ({ ...item, isWin: false }))
      this.positionConfig.alreadyPositionList = []
    },
  },
  persist: {
    enabled: false,
  },
})
