//ini vuex bwt manggil function berhubungan sma produk
import axios from "axios"
// cookies itu berhubungan sma token"an, jdi dia kya baca tokenny ini tuh apa dan siapa role userny
import Cookies from 'js-cookie'


export default {
    //ini function load semua produk
    LOAD_PRODUCTS: async ({commit}) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/product',
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(response => {
                    commit('setProducts', response.data.data.products)
                    resolve(response)
                })
                .catch(error => { reject(error) })
        })
    },
    // ini function load produk tertentu aja based on product_id
    LOAD_PRODUCT: async ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `http://localhost:3000/product/${payload}`,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(response => {
                    console.log(response.data.data)
                    commit('setProduct', response.data.data)
                    resolve(response)
                })
                .catch(error => { reject(error) })
        })
    },
    // ini function delete produk
    DELETEPRODUCT: async ({commit, dispatch}, payload) => {
        const token = Cookies.get('token')
        return new Promise((resolve, reject) => {
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/product/${payload}`,
                headers: { 'Content-Type': 'application/json', 'Authorization': token }
            })
                .then(response => {
                    console.log(response.data.data)
                    swal({
                        text: "product has been deleted successfully",
                        icon: "success"
                    })
                    resolve(response)
                })
                .catch(err => {
                    swal({
                        text: err.response.data.meta.message,
                        icon: "error"
                    }) 
                    reject(err)
                })
        })
    },
    //ini function add product
    CREATE_PRODUCT: async ({commit, dispatch}, payload) => {
        const token = Cookies.get('token')
        console.log('payload', payload)
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `http://localhost:3000/product`,
                data: payload,
                headers: { 'Content-Type': 'application/json', 'Authorization': token }
            })
                .then(response => {
                    console.log('response', response.data.data)
                    dispatch('LOAD_PRODUCTS')
                    swal({
                        text: "product has been created successfully",
                        icon: "success"
                    })
                    resolve(response)
                })
                .catch(err => {
                    console.log('test', err.response)
                    swal({
                        text: err.response.data.meta.message,
                        icon: "error"
                    }) 
                    reject(err)
                })
        })
    },
    //ini fuction edit produk
    UPDATE_PRODUCT: async ({commit, dispatch}, payload) => {
        const token = Cookies.get('token')
        console.log('payload', payload)
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: `http://localhost:3000/product/${payload.id}`,
                data: payload.data,
                headers: { 'Content-Type': 'application/json', 'Authorization': token }
            })
                .then(response => {
                    dispatch('LOAD_PRODUCTS')
                    console.log(response.data.data)
                    commit('setProduct', response.data.data)
                    swal({
                        text: "product has been updated successfully",
                        icon: "success"
                    })
                    resolve(response)
                })
                .catch(err => {
                    swal({
                        text: err.response.data.meta.message,
                        icon: "error"
                    }) 
                    reject(err)
                })
        })
    },
    //ini function search product
    SEARCHPRODUCT: async ({commit}, payload) => {
        return new Promise((resolve, reject) => {
            console.log('payload', payload)
            axios.get('http://localhost:3000/product?name=' + payload.product_name)
                .then(response => {
                    console.log('result', response.data.data)
                    commit('setSearchProducts', response.data.data.products)
                    resolve(response)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
}