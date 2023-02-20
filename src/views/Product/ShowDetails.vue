<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-1"></div>
      <!--            display image-->
      <div class="col-md-4 col-12">
        <img :src="product.image" class="img-fluid" />
      </div>
      <!--            display product details-->
      <div class="col-md-6 col-12 pt-3 pt-md-0" v-if="product">
        <h4>{{ product.name }}</h4>
        <h6 class="font-weight-bold">IDR {{ product.price }}</h6>
        <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-4 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text">Quantity</span>
            </div>
            <input type="number" class="form-control" v-model.number="cart_qty" />
            <p v-if="stockCheck" class="text-sm text-danger">Stock not enough</p>
          </div>

          <div class="input-group col-md-3 col-4 p-0">
            <button class="btn d-inline-block" id="add-to-cart-button" @click="addToCart" :disabled="stockCheck">
              Add to Cart
            </button>
          </div>
        </div>
        <div class="features pt-3">
          <h5><strong>Description</strong></h5>
          <ul>
            <p>{{ product.description }}</p>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import swal from "sweetalert";
import axios from "axios";
export default {
  data() {
    return {
      cart_qty: 1,
    };
  },
  props: ["baseURL"],
  computed: {
    ...mapGetters({
      product: 'product/getProduct',
      isLoggedIn: 'auth/isLoggedIn'
    }),
    stockCheck() {
      return this.cart_qty > this.product.stock
    }
  },
  methods: {
    async editProduct() {
      console.log('product', this.product)
      await axios.put(`${this.baseURL}/updateproduct`,
        this.product)
        .then(() => {
          this.$router.push({ name: 'Product' });
          swal({
            text: "product has been updated successfully",
            icon: "success"
          })
        }).catch(err => console.log('err', err));
    },
    async fetchData() {
      await this.$store.dispatch('product/LOAD_PRODUCT', this.$route.params.product_id)
    },
    addToCart() {
      if (this.isLoggedIn) {
        const payload = {
          quantity: this.cart_qty,
          product_id: this.product.id
        }
        this.$store.dispatch('cart/ADD_TO_CART', payload).then((response) => {
          swal({
            text: 'Product successfully added to cart!',
            icon: 'success'
          })
        }).catch((err) => {
          swal({
            text: err.response.data.meta.message,
            icon: 'error'
          })
        })
      } else {
        swal({
          text: 'Please login first before add product to cart!',
          icon: 'warning'
        })
        this.$router.push({ name: 'Signin' })
      }
    },
  },
  beforeMount() {
    this.fetchData()
  },
};
</script>

<style>
#add-to-cart-button {
  background-color: #febd69;
}
</style>  