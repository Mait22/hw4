<template>
  <div>
    <b-alert show variant="danger" v-if="wrongLogin"
      >Poor poor work ethic! Cant even sign in to a blog site!</b-alert
    >
    <b-form @submit.prevent="login" @reset="resetted" v-if="show">
      <b-form-group id="input-group-1" label="Your email:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="mr-1"> Submit </b-button>

      <b-button type="reset" variant="outline-danger" class="mr-1" ref="resetButton">
        Reset
      </b-button>

    </b-form>


    <p>
      <br />
      Don't have an account? Sorry but in that case America does not need you!
    </p>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: "",
      password: "",
      show: true, // TO-DO add now show login if already logged in
      wrongLogin: false
    };
  },
  methods: {
    login() {

      store.dispatch('login', {
            email: this.email,
            password: this.password,
      })
        .then(() => {
          console.log(this.getUserData)
          if(this.getUserData !== undefined) {
            this.$router.push({ name: "testview" });
            this.$refs.resetButton.click();
          }
          else if (this.getUserData === undefined) {
            this.wrongLogin = true;
            this.$refs.resetButton.click();
          }
        })
        .catch(function (err) {
            // Debugging
            console.log("VIGA!")
            console.log(err);
            // Error handling in UI
            this.wrongLogin = true;
            this.$refs.resetButton.click();
        });
    },
    
    resetted() {
      this.email = "";
      this.password = "";
      this.wrongLogin = false;
    },
  },

  computed: {
    ...mapGetters([
      'getUserData',
      'getSubscribedPosts',
      'getAllAuthors'
    ])
  },
};
</script>

<style scoped></style>