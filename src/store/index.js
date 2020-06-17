import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api.client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
    items: [],
    rightItems: []
  },
  mutations: {
    setHistory (state, history) {
      state.history = history
    },
    setOneItemHistory (state, item) {
      state.history.push(item)
    },
    setItems (state, items) {
      state.items = items
    },
    addItem (state, item) {
      state.items.push(item)
    },
    addRightItem (state, item) {
      state.rightItems.push(item)
    },
    deleteItem (state, index) {
      state.items.splice(index, 1)
    },
    deleteRightItem (state, index) {
      state.rightItems.splice(index, 1)
    }
  },
  actions: {
    actionItems ({ commit }) {
      api.get('http://jsonplaceholder.typicode.com/posts')
        .then(({ data }) => {
          const items = data.map(item => ({
            id: item.id,
            name: item.title
          }))
          const req = items.map(item =>
            api.get(`http://jsonplaceholder.typicode.com/comments?postId=${item.id}`)
          )
          Promise.all(req)
            .then(values => {
              values.forEach(({ data }, index) => {
                items[index].items = data.map(value => ({
                  id: value.id,
                  name: value.name
                }))
              })
              commit('setItems', items)
            })
        })
    }
  }
})
