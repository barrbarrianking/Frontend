import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddProduct from '../views/Product/AddProduct';
import Product from "../views/Product/Product";
import EditProduct from "../views/Product/EditProduct";
import ShowDetails from "../views/Product/ShowDetails";
import Signin from "../views/Signin";
import Signup from "../views/Signup";
import Cart from "../views/Cart";
import SearchResult from "../views/SearchResult";
import Cookies from 'js-cookie'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/product/add',
    name: 'AddProduct',
    component: AddProduct,
    meta: {
      auth: true,
    },
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/product/:id",
    name: "EditProduct",
    component: EditProduct,
    meta: {
      auth: true,
    },
  },
  {
    path: "/product/show/:id",
    name: "ShowDetails",
    component: ShowDetails,
  },
  {
    path: "/searchresult",
    name: "SearchResult",
    component: SearchResult,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: {
      hideForAuth: true
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      hideForAuth: true
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      auth: true,
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // check if token is present in cookies, if yes hit api login
  // if not redirect to login page
  const token = Cookies.get('token')
  if (token) {
    const isLoggedIn = store.getters['auth/isLoggedIn']
    if (!isLoggedIn) {
      store.dispatch('auth/GET_USER', {token})
      .then(response => {
        console.log('response', response)
        if (to.name === 'Signin' || to.name === 'Signup') {
          if(to.matched.some((record) => record.meta.auth)){
            next()
          }
          next({name: 'HomeView'})
        }else{
          next()
        }
      })
      .catch(error => {
        console.log('error', error)
        next({name: 'Signin'})
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'Signin' || to.name === 'Signup') {
      next()
    } else {
      if(to.matched.some((record) => record.meta.auth)){
        next({name: 'Signin'})
      }
      next()
    }
  }
})

export default router