<template>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center pt-3">
          <!-- display logo -->
        </div>
      </div>
  
      <!-- header -->
  
      <div class="row">
        <div class="col-12 justify-content-center d-flex flex-row pt-3">
          <div id="signup" class="flex-item border">
            <h2 class="pt-4 pl-4">Create Account</h2>
            <form @submit.prevent="signup" class="pt-4 pl-4 pr-4">
              <div class="form-group">
                <label for="Email">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label> Full Name</label>
                    <input
                      type="text"
                      v-model="user.full_name"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <!-- password -->
              <div class="form-group">
                <label for="Password"> Password</label>
                <input
                  type="password"
                  v-model="user.password"
                  class="form-control"
                  required
                />
              </div>
              <!-- confirm password -->
              <div class="form-group">
                <label for="Password"> Confirm password</label>
                <input
                  type="password"
                  v-model="user.confirm_password"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      v-model="user.phone"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      v-model="user.address"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <button class="btn btn-primary mt-2">Create Account</button>
            </form>
          </div>
        </div>
      </div>
  
      <!-- form -->
    </div>
  </template>
  <script>
  import swal from "sweetalert";
  export default {
    props: ["baseURL"],
    data() {
      return {
        user: {
          full_name: '',
          email: '',
          address: '',
          phone: '',
          password: '',
          confirm_password: ''
        }
      };
    },
    methods: {
      signup(e) {
        this.$store.dispatch('auth/REGISTER', this.user).then((response) => {
          swal({
            text: "You have successfully created an account",
            icon: "success",
          });
          this.$router.push({ name: "Signin" });
        }).catch(err => {
          swal({
            text: err.response.data.meta.message,
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
    color: #000;
  }
  
  @media screen and (min-width: 992px) {
    #signup {
      width: 40%;
    }
  }
  </style>