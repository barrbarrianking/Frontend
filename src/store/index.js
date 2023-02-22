// ini vuex indexnya
import Vue from 'vue'
import Vuex from 'vuex'

import product from './product'
import auth from './auth'
import cart from './cart'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        product,
        auth,
        cart
    }
})

export default store
