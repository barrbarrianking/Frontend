<template>
  <div>
    <Navbar />
    <router-view :baseURL="baseURL" :products="products">
    </router-view>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductBox from "./components/Product/ProductBox.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue"

export default {
  components: { Navbar, Footer, ProductBox },
  data() {
    return {
      baseURL: "http://localhost:3000",
    }
  },
  computed: {
    ...mapGetters({
      products: 'product/getAllProducts'
    })
  },

  methods: {
    async fetchData() {
      // api call to get the products
      try {
        await this.$store.dispatch('product/LOAD_PRODUCTS')
      }catch(err){
        console.log('err', err)
      }
    }
  },

  async beforeMount () {
    await this.fetchData()
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
