<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4> Search Result </h4>
                <router-link v-if="isAdmin" :to="{ name: 'AddProduct' }" style="float: right">
                    <button class="btn">
                        Add Product
                    </button> </router-link>
            </div>
        </div>
        <div class="row">
            <!--            display all the products in productbox component-->
            <div v-for="product of products" :key="product.product_id" class="col-md-6 col-xl-4 col-12 pt-3 d-flex">
                <ProductBox :product="product" @deleteProduct="fetchData" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProductBox from "../components/Product/ProductBox";
export default {
    components: { ProductBox },
    // props:["products"],
    computed: {
        ...mapGetters({
            products: 'product/getAllSearchProducts',
            isAdmin: 'auth/isAdmin'
        })
    },
    methods: {
        async fetchData() {
            await this.$store.dispatch('product/LOAD_PRODUCTS')
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>