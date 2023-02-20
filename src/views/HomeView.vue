<template>
  <div id="home">
    <div id="background-div" class="page-holder bg-cover">
      <div class="container py-5">
        <header class="text-left text-white py-5">
          <h3 class="mb-4 rounded" id="heading">
            <a href="#start-shopping" class="bg-white px-2 py-2 rounded"> Selamat Datang</a> </h3>
            <p class="lead mb-0 bg-dark p-1 rounded">Since 1990</p>
        </header>
      </div>
      <hr />
    </div>

  <!--    display top products-->
    <div class="container py-2">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="pt-3"> Top Products</h2>
        </div>
      </div>

      <!--      display products-->

      <div v-if="products.length" class="row">
        <div v-for="(product, i) in topProducts" :key="i"
             class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
          <ProductBox :product="product" />
        </div>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>

  </div>
</template>

<script>
import ProductBox from "../components/Product/ProductBox";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {ProductBox},
  computed: {
    ...mapGetters({
      products: 'product/getAllProducts'
    }),
    topProducts(){
      const products = this.products || []
      return products.slice(0, 6)
    },
  },
};
</script>
<style>
  .page-holder {
    min-height: 100vh;
  }
  .bg-cover{
    background-size: cover !important;
  }
  #background-div {
    background: url("../assets/homepicture.jpg");
  }
  #heading {
    font-weight: 400;
  }
</style>