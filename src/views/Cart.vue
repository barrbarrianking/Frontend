<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Shopping cart</h3>
      </div>
    </div>

    <!-- loop over the cart items and display -->

    <div v-if="cartItems.length">
      <div
        v-for="cartItem in cartItems"
        :key="cartItem.id"
        class="row mt-2 pt-3 justify-content-around"
      >
        <div class="col-2"></div>
        <div class="col-md-3 embed-responsive embed-responsive-16by9">
          <img
            :src="cartItem.product.image"
            alt=""
            class="w-100 card-image-top embed-responsive-item"
            style="object-fit: cover"
          />
        </div>

        <!-- display product name, quantity -->
        <div class="col-md-5 px-3">
          <div class="card-block px-3">
            <h6 class="card-title">
              <router-link
                :to="{
                  name: 'ShowDetails',
                  params: { product_id: cartItem.product_id },
                }"
              >
                {{ cartItem.product.name }}
              </router-link>
            </h6>

            <p class="mb-0 font-weight-bold" id="item-price">
              IDR {{ cartItem.product.price }} per unit
            </p>
            <p class="mb-0" style="float: left">
              Quantity:{{ cartItem.quantity }}
            </p>
          </div>
          <p class="mb-0" style="float: right">
            Total:
            <span class="font-weight-bold">
              IDR {{ cartItem.product.price * cartItem.quantity }}
            </span>
          </p>
          <br />
          <button
            class="text-right btn btn-danger"
            @click="deleteItem(cartItem.id)"
          >
            Remove from cart
          </button>
        </div>
        <div class="col-2"></div>
        <div class="col-12"><hr /></div>
      </div>
    </div>
    <div v-else>
      <p>No product in cart</p>
    </div>

    <!-- display the price -->
    <div class="d-flex w-100 justify-content-between align-items-center">
      <div class="d-flex">
        <input class="mr-2 form-control" type="text" v-model="coupon" />
        <button class="btn btn-primary" @click="onUseCoupon">Use Coupon</button>
      </div>
      <div class="total-cost pt-2 text-right">
        <h5>Total : IDR {{ totalCost.toFixed(2) }}</h5>
        <button class="btn btn-primary" @click="checkoutProduct">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["baseURL"],
  data() {
    return {
      coupon: "",
      discount: null,
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
    totalCost() {
      if (this.cartItems.length) {
        let totalCost = this.cartItems.reduce((acc, el) => {
          return acc + el.product.price * el.quantity;
        }, 0);
        if (this.discount) {
          totalCost = totalCost - totalCost * (this.discount / 100);
        }
        return totalCost;
      } else {    
        return 0;
      }
    },
  },
  methods: {
    onUseCoupon() {
      if (this.coupon === "DISKON10") {
        this.discount = 10;
      } else {
        swal({
          text: "Invalid Coupon",
          icon: "error",
        });
      }
    },
    async checkoutProduct() {
      const payload = {
        products: this.cartItems.map((el) => {
          return {
            id: el.id,
            user_id: el.user_id,
            product_id: el.product_id,
            quantity: el.quantity,
            product: el.product,
          };
        }),
        total_price: this.totalCost,
      };
      const confirm = await swal({
        text: "Are you sure want to checkout this product?",
        buttons: {
          cancel: {
            text: "Cancel",
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: true,
        },
      });
      if (confirm) {
        this.$store
          .dispatch("cart/CHECKOUT_CART", payload)
          .then((response) => {
            this.$router.push({ name: "HomeView" });
          })
          .catch((err) => {});
      } else {
        swal({
          text: "Checkout canceled",
          icon: "info",
        });
      }
    },
    async deleteItem(itemId) {
      await swal({
        text: "are you sure want to delete this product from cart?",
        buttons: {
          cancel: true,
          confirm: true,
        },
      })
        .then(() => {
          this.$store
            .dispatch("cart/DELETE_CART", itemId)
            .then((response) => {
              swal({
                text: "Product successfully deleted from cart",
                icon: "success",
              });
            })
            .catch((err) => {
              swal({
                text: err.response.data.meta.message,
                icon: "error",
              });
            });
        })
        .catch(() => {
          swal({
            text: "Product not deleted",
            icon: "info",
          });
        });
    },
    loadCartItems() {
      this.$store.dispatch("cart/LOAD_CART_ITEMS").catch((err) => {
        swal({
          text: err.response.data.meta.message,
          icon: "error",
        });
      });
    },
  },
  beforeMount() {
    this.loadCartItems();
  },
};
</script>
<style scoped>
h4,
h5 {
  color: #484848;
  font-size: 700;
}
</style>