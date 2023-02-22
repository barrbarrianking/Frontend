<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3"> Edit Product</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form v-if="productEdit">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="productEdit.name" required />
                    </div>
                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="number" class="form-control" v-model="productEdit.stock" required />
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" class="form-control" v-model="productEdit.price" required />
                    </div>
                    <div class="form-group">
                        <label>Image Url</label>
                        <input type="text" class="form-control" v-model="productEdit.image" required />
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" v-model="productEdit.description" class="form-control" required />
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" @click="editProduct">Submit</button>
                    </div>
                    
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            productEdit: {}
        }
    },
    props: ["baseURL"],
    computed: {
        // ini bwt ngejalanin getter bagian get produk satuan (by product_id) dari vuex getters
        ...mapGetters({
            product: 'product/getProduct',
        })
    },
    methods: {
        async editProduct() {
            // payload ini bwt kiriman ke BE, bwt ngeset ulang data dari product_id tsb sesuai value 
            // dari v-model masing-masing field
            const payload = {
                id: this.product.id,
                data: {
                    name: this.productEdit.name,
                    stock: this.productEdit.stock,
                    price: this.productEdit.price,
                    image: this.productEdit.image,
                    description: this.productEdit.description
                }
            }
            //ini manggil function update product dari vuex
            this.$store.dispatch('product/UPDATE_PRODUCT', payload).then(() => {
                //router push itu bwt nge-redirect ke halaman sesuai nama yg di define (mengacu ke nama di router - index.js)
                this.$router.push({ name: 'Product' })
            })
        },
        //async itu artinya bwt ngejalanin function ini secara bersamaan dengan function" lainnya
        async fetchData() {
            //ini manggil function nge-get detail datanya
            await this.$store.dispatch('product/LOAD_PRODUCT', this.$route.params.id).then(response => {
                console.log('this.product', this.product)
                this.productEdit = this.product
            })
        },
    },
    mounted() {
        this.fetchData();
    }
}
</script>