<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- Navbar content -->
    <!--    Logo-->
    <router-link class="navbar-brand d-flex align-items-center" :to="{ name: 'HomeView' }">
      <img id="logo" src="../assets/logo.png" />
      <h4 class="mb-0">Oscar Olshop</h4>
    </router-link>
    <!--    Burger Button-->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!--      Search Bar-->
      <form class="form-inline ml-auto mr-auto">
        <div class="input-group">
          <input size="100" v-model="product_name" type="text" class="form-control" placeholder="Search Items"
            aria-label="Username" aria-describedby="basic-addon1" @input="searchProduct" />
          <div class="input-group-prepend">
            <span class="input-group-text" id="search-button-navbar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                viewBox="0 0 16 16">
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
          </div>
        </div>
      </form>
      <!-- dropdown for browse -->
      <ul class="navbar-nav ml-auto d-flex align-items-center">
        <li class="nav-item dropdown pb-0">
          <a class="nav-link text-light dropdown-toggle" href="#" id="navbarAccount" data-toggle="dropdown">
            Browse
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarAccount">
            <router-link class="dropdown-item" :to="{ name: 'HomeView' }">Home
            </router-link>
            <router-link class="dropdown-item" :to="{ name: 'Product' }">Product
            </router-link>
          </div>
        </li>
        <li class="nav-item dropdown pb-0">
          <a class="nav-link dropdown-toggle text-light" href="#" id="navbarAccount" data-toggle="dropdown">
            Accounts
          </a>
          <div v-if="!isLoggedIn" class="dropdown-menu" aria-labelledby="navbarAccount">
            <router-link class="dropdown-item" :to="{ name: 'Signup' }">Sign up
            </router-link>
            <router-link class="dropdown-item" :to="{ name: 'Signin' }">Sign in
            </router-link>
          </div>
          <div v-else class="dropdown-menu">
            <p class="dropdown-item mb-0">{{ user.full_name }}</p>
            <button class="dropdown-item" @click="logout">Sign out</button>
          </div>
        </li>
        <li class="nav-item pb-0 ml-2">
          <div id="cart" style="position:relative">
            <span id="nav-cart-count">{{ cartCount }}</span>
            <router-link class="text-light" :to="{ name: 'Cart' }">
              <i class="fa fa-shopping-cart" style="font-size:24px"></i>
            </router-link>
          </div>
        </li>
      </ul>
      <!-- dropdown for account -->
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ShowDetailsDummy from "@/views/Product/ShowDetails.vue";
import axios from "axios";
import swal from "sweetalert";
import { debounce } from 'lodash'

export default {
  name: "Navbar",
  props: ["cartCount"],
  data() {
    return {
      token: null,
      product_name: null
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      user: 'auth/getUser'
    })
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/LOGOUT')
      swal({
        text: "Logged you out. Visit again",
        icon: "success",
      });
      this.$emit("resetCartCount");
      this.$router.push({ name: "HomeView" });
    },

    searchProduct : debounce(async function() {
      try {
        const search = {
          product_name: this.product_name
        };
        console.log('product', search)
        await this.$store.dispatch('product/SEARCHPRODUCT', search)
        console.log('this.$router.path', this.$route.path)
        if(this.$route.path !== '/searchresult') {
          this.$router.push('/searchresult')
        }
      }catch(err){
        console.log('err', err)
      }
    }, 500),
    // async fetchData() {
    //   await this.$store.dispatch('product/LOAD_PRODUCTs', this.$route.params.product_id)
    //     .then(res => {
    //       this.product = this.products
    //     })
    // },
  },
  mounted() {

  },
}
</script>
<style scoped>
#logo {
  width: 40px;
  margin-left: 12px;
  margin-right: 12px;
}

.nav-link {
  color: rgba(255, 255, 255);
}

#search-button-navbar {
  background-color: #febd69;
  border-color: #febd69;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}

#nav-cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  height: 10px;
  width: 10px;
  font-size: 15px;
  align-items: center;

  display: flex;
  justify-content: center;

  position: absolute;
  margin-left: 16px;
}
</style>