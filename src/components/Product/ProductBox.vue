<template>
    <div class="card h-100 w-100">
        <div class="embed-responsive embed-responsive-16by9">
            <img class="card-img-top embed-responsive-item" :src="product.image" alt="Card image cap" />
        </div>
        <div class="card-body">
            <router-link :to="{ name: 'ShowDetails', params: { product_id: product.id } }">
                <h5 class="card-title">{{ product.name }}</h5>
            </router-link>
            <p class="card-text">
                {{ product.description.substring(0, 65) }}
            </p>
            <div class="d-flex align-items-center">
                <router-link v-if="isAdmin" class="mr-2 btn btn-primary" :to="{ name: 'EditProduct', params: {id: product.id } }">
                    Edit
                </router-link>
                <button v-if="isAdmin" type="button" class="btn btn-primary" @click="deleteProduct">Delete Product</button>
            </div>
        </div>
    </div>
</template>
<script>
// swall ato sweetalert itu dipake bwt nampilin notifikasi si prosesnya itu success ato failed
import swal from 'sweetalert'

export default {
    name: "ProductBox",
    props: ["product", "baseURL"],
    computed: {
        isAdmin(){
            return this.$store.getters['auth/isAdmin']
        }
    },
    methods: {
        async deleteProduct() {
            console.log('deleteproduct', this.deleteproduct)
            const confirm = await swal({
            text: 'Are you sure want to delete this product?',
            buttons: {
                cancel: {
                text: 'Cancel',
                value: false,
                visible: true,
                className: '',
                closeModal: true,
                },
                confirm: true
            }
            })
            if(confirm){
                await this.$store.dispatch('product/DELETEPRODUCT', this.product.id)
                    .then(() => {
                        this.$emit("deleteProduct");
                        this.$router.push({name: 'Product'});
                    }).catch(err => console.log('err', err));
            }else{
                swal({
                    text: 'Canceled',
                    icon: 'info'
                })
            }
        },
    }
}
</script>
<style scoped>
.card-img-top {
    object-fit: cover;
}

a {
    text-decoration: none;
}

.card-title {
    color: #484848;
}
</style>