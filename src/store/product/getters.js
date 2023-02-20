export default {
    getAllProducts: state => {
      return state.products
    },
    getProduct: state => {
      return state.product
    },
    getAllDeleteProduct: state => {
      return state.deleteproduct
    },
    getAllSearchProducts: state => {
      return state.searchProducts
    }
  }