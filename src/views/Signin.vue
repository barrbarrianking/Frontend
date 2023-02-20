<template>
    <div class="conatiner">
      <div class="row">
        <div class="col-12 justify-content-center d-flex flex-row pt-5">
          <div id="signin" class="flext-item border">
            <h2 class="pt-4">Sign-In</h2>
            <form @submit.prevent="signin" class="form-group pt-4 pl-4 pr-4">
              <div class="form-group">
                <label>Email </label>
                <input v-model="user_email" type="email" class="form-control" />
              </div>
              <div class="form-group">
                <label>Password </label>
                <input v-model="user_password" type="password" class="form-control" />
              </div>
              <button class="btn btn-primary mt-2 py-0">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import swal from "sweetalert";
  export default {
    props: ["baseURL"],
    data() {
      return {
        user_email: null,
        user_password: null,
      };
    },
    methods: {
      async signin(e) {
        this.$store.dispatch('auth/LOGIN', {
          email: this.user_email,
          password: this.user_password
        }).then(() => {
          this.$router.push({ name: "HomeView" });
          swal({
            text: "You have successfully logged in",
            icon: "success",
          });
        }).catch(err => {
          swal({
            text: "Invalid email or password",
            icon: "error",
          });
        })
      },
    },
  };
  </script>
  <style scoped>
  .btn-primary {
    background-color: #f0c14b;
    color: black;
  }
  
  @media screen and (min-width: 992px) {
    #signin {
      width: 40%;
    }
  }
  </style>