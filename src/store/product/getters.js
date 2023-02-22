// ini bwt mapGetters
export default {
    getAllProducts: state => {
      return state.products
      //state.variable itu bwt nge re-evaluate datany
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