export default {
    setProducts(state, payload) {
        state.products = payload
    },
    setProduct(state, payload) {
        state.product = payload
    },
    setDeleteProduct(state, payload) {
        state.deleteproduct = payload
    },
    setSearchProducts(state, payload){
        state.searchProducts = payload
    }
}