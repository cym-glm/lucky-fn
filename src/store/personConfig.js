import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { defaultPersonList } from './data'
import { usePrizeConfig } from './prizeConfig'

export const usePersonConfig = defineStore('person', {
  state() {
    return {
      personConfig: {
        allPersonList: [],
        alreadyPersonList: [],
      },
    }
  },
  getters: {
    getPersonConfig(state) {
      return state.personConfig
    },
    getAllPersonList(state) {
      return state.personConfig.allPersonList.filter((item) => item)
    },
    getNotThisPrizePersonList(state) {
      const currentPrize = usePrizeConfig().prizeConfig.currentPrize
      const data = state.personConfig.allPersonList.filter((item) => {
        return !item.prizeId.includes(currentPrize.id)
      })
      return data
    },
    getAlreadyPersonList(state) {
      return state.personConfig.allPersonList.filter(item => item.isWin === true)
    },
    getAlreadyPersonDetail(state) {
      return state.personConfig.alreadyPersonList
    },
    getNotPersonList(state) {
      return state.personConfig.allPersonList.filter(item => item.isWin === false)
    },
  },
  actions: {
    addNotPersonList(personList) {
      if (personList.length <= 0) return
      personList.forEach((item) => {
        this.personConfig.allPersonList.push(item)
      })
    },
    addAlreadyPersonList(personList, prize) {
      if (personList.length <= 0) return
      personList.forEach((person) => {
        this.personConfig.allPersonList.map((item) => {
          if (item.id === person.id && prize != null) {
            item.isWin = true
            item.prizeName.push(prize.name)
            item.prizeTime.push(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))
            item.prizeId.push(prize.id)
          }
          return item
        })
        this.personConfig.alreadyPersonList.push(person)
      })
    },
    moveAlreadyToNot(person) {
      if (person.id === undefined || person.id == null) return
      const alreadyPersonListLength = this.personConfig.alreadyPersonList.length
      for (let i = 0; i < this.personConfig.allPersonList.length; i++) {
        if (person.id === this.personConfig.allPersonList[i].id) {
          this.personConfig.allPersonList[i].isWin = false
          this.personConfig.allPersonList[i].prizeName = []
          this.personConfig.allPersonList[i].prizeTime = []
          this.personConfig.allPersonList[i].prizeId = []
          break
        }
      }
      for (let i = 0; i < alreadyPersonListLength; i++) {
        this.personConfig.alreadyPersonList = this.personConfig.alreadyPersonList.filter(item => item.id !== person.id)
      }
    },
    deletePerson(person) {
      if (person.id !== undefined || person.id != null) {
        this.personConfig.allPersonList = this.personConfig.allPersonList.filter(item => item.id !== person.id)
        this.personConfig.alreadyPersonList = this.personConfig.alreadyPersonList.filter(item => item.id !== person.id)
      }
    },
    deleteAllPerson() {
      this.personConfig.allPersonList = []
      this.personConfig.alreadyPersonList = []
    },
    resetPerson() {
      this.personConfig.allPersonList = []
      this.personConfig.alreadyPersonList = []
    },
    resetAlreadyPerson() {
      this.personConfig.allPersonList.forEach((item) => {
        item.isWin = false
        item.prizeName = []
        item.prizeTime = []
        item.prizeId = []
      })
      this.personConfig.alreadyPersonList = []
    },
    setDefaultPersonList() {
      this.personConfig.allPersonList = defaultPersonList
      this.personConfig.alreadyPersonList = []
    },
    reset() {
      this.personConfig = {
        allPersonList: [],
        alreadyPersonList: [],
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        key: 'personConfig',
      },
    ],
  },
})
