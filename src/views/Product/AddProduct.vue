<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4>Add New Product</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" v-model="product.name" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="number" v-model="product.stock" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" v-model="product.price" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Image Url</label>
                        <input type="text" v-model="product.image" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" v-model="product.description" class="form-control">
                    </div>
                    <button type="button" class="btn btn-primary" @click="addProduct">Add Product</button>
                </form>
            </div>
            <div class="col-3"></div>
        </div>

        <!--        Form-->
    </div>
</template>
<script>
export default {
    props: ["baseURL"],
    data() {
        return {
            product: {
                name: "",
                stock: 0,
                price: 0,
                image: "",
                description: ""
            }
        }
    },
    methods: {
        addProduct() {
            this.$store.dispatch('product/CREATE_PRODUCT', this.product).then(() => {
                this.$router.push({ name: 'Product' })
            })
        }
    }
}
</script>