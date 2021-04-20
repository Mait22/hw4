
import Vue from 'vue'
import Vuex from 'vuex';
// import axios from 'axios'


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {

    userData: undefined,
    // pseudocode for API development
    /*
    userData: {
        isLoggedIn: null, 
        jwtToken: null,
        email: null,
        name: null
    },
    */

    subscribedPosts: null, 
    // pseudocode for API development
    /*
    subscribedPosts: {
    [{
        authorName: "",
        authorEmail: "",
        title: "",
        body: "",
        imageUrl: null,
        mediaUrl: null,
        tags: [],
        likes: []
     }]
     },
    */

    allAuthors: null,
    // pseudocode for API development
    // subscribedPosts: {
    //[{
    //    authorName: "",
    //    authorEmail: "",
    //    image: "",
    //    isSubscribedTo: "",
    // }]
    // },
  },

  // For synchronous actions
  mutations: {

    SET_USER_DATA (state, userData) {
        state.userData = userData
        sessionStorage.setItem('userData', JSON.stringify(userData))
        /*
        axios.defaults.headers.common['auth-token'] = `Bearer ${
          userData.token
        }`
        */
      },

    CLEAR_USER_DATA (state) {
        sessionStorage.removeItem('userData')
        location.reload()
        state.userData = undefined
      }
 
  },

  getters: {
    getUserData: state => {
        return state.userData
    },
    getSubscribedPosts: state => {
        return state.subscribedPosts
    },
    getAllAuthors: state => {
        return state.allAuthors
    },

  },
   
  // For async actions, eg API calls 
  actions: {

    // logout
    logout ({ commit }) {
        commit('CLEAR_USER_DATA')
      },

    // login
    login({ commit }, credentials) {

        // API call to login
        /*
        return axios({
          method: "post",
          url: "//localhost:8080/api/user/login",
          headers: {},
          data: {
            email: credentials.email,
            password: credentials.password,
          },
        })
        .then(({ response }) => {
          commit('SET_USER_DATA', response)
          return true
        })
        .catch((err) => {
            commit('CLEAR_USER_DATA')
            console.log('Login error')
            console.log(err);
            retrun false
        });
        */

        // API calls are also needed for loading allAuthors and subscribedPosts 
        // But now authorized by received token and user ID

        // Fake hardcoded part

        const response = 
        {
            isLoggedIn: true, 
            jwtToken: "jjjjjjj",
            email: "donaldtrump@gmail.com",
            name: "Donald Trump"
        }

        if(credentials.email === "donaldtrump@gmail.com" && credentials.password === "makeitgreatagain") {
            commit('SET_USER_DATA', response)
        }

        else {
            commit('CLEAR_USER_DATA')
        }

      },


  }
})

export default store;