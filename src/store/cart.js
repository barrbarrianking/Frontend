// ini vuex bwt cart
import axios from 'axios'
import Cookies from 'js-cookie'


export default {
  namespaced: true,
  state: {
    cartItems: [],
  },
  getters: {
    getCartItems: state => state.cartItems,
  },
  mutations: {
    setCartItems: (state, payload) => {
      state.cartItems = payload
    }
  },
  actions: {
    ADD_TO_CART: async ({commit}, payload) => {
      const token = Cookies.get('token')
      console.log('payload', payload, token)
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/cart',
          data: payload,
          headers: { 'Authorization': token }
        })
         .then(response => {
          resolve(response)
         })
         .catch(err => {
          reject(err)
         })
      })
    },
    CHECKOUT_CART: async ({commit}, payload) => {
      const token = Cookies.get('token')
      console.log('payload checkout', payload, token)
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/transaction',
          data: payload,
          headers: { 'Authorization': token }
        })
         .then(response => {
          console.log('response checkout', response)
          swal({
            title: 'Success',
            text: `Checkout success with transaction number ${response.data.data.transaction_number}`,
            icon: 'success'
          })
          resolve(response)
         })
         .catch(err => {
          swal({
            text: err.response.data.meta.message,
            icon: 'error'
          })
          reject(err)
         })
      })
    },
    LOAD_CART_ITEMS: async ({commit}, payload) => {
      const token = Cookies.get('token')
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/cart/',
          headers: { 'Authorization': token }
        })
         .then(response => {
          commit('setCartItems', response.data.data)
          resolve(response)
         })
         .catch(err => {
          reject(err)
         })
      })
    },
    DELETE_CART: async ({commit}, payload) => {
      const token = Cookies.get('token')
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: 'http://localhost:3000/cart/' + payload,
          headers: { 'Authorization': token }
        })
         .then(response => {
          console.log('response delete cart', response)
          commit('setCartItems', response.data.data)
          resolve(response)
         })
         .catch(err => {
          reject(err)
         })
      })
    },
  }
}
