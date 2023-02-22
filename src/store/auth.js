// ini vuex bwt login
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    getUser: state => state.user,
    isLoggedIn: state => !!state.user,
    isAdmin: state => state.user ? state.user.role === 'admin' : false
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    }
  },
  actions: {
    LOGIN: async ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/signin',
          data: payload,
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => {
            Cookies.set('token', response.data.data.accessToken, { expires: 1 })
            commit('setUser', response.data.data)
            resolve(response)
          })
          .catch(error => { reject(error) })
      })
    },
    REGISTER: async ({commit}, payload) => {
      console.log('register', payload)
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/signup',
          data: payload,
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => {
            // Cookies.set('token', response.data.data.accessToken, { expires: 1 })
            // commit('setUser', response.data.data)
            resolve(response)
          })
          .catch(error => { reject(error) })
      })
    },
    LOGOUT: ({commit}, payload) => {
      Cookies.remove('token')
      commit('setUser', null)
    },
    GET_USER: async ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        console.log('get user payload', payload)
        axios({
          method: 'GET',
          url: 'http://localhost:3000/user',
          headers: { 'Authorization': payload.token }
        })
          .then(response => {
            commit('setUser', response.data.data)
            resolve(response)
          })
          .catch(error => { reject(error) })
      })
    },
  }
}
