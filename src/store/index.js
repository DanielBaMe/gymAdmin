import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from '../router/router'
import ErrorsList from '../components/ErrorsList.vue'
Vue.use(Vuex)

export default new Vuex.Store({
  components: {
    'error-list': ErrorsList
  },
  data(){
    errors: []
  },
  state: {
    token: null,
    loggingIn: false,
    loginError: null
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, token) => {
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    }
  },
  actions: {
    doLogin({commit}, loginData){
      commit('loginStart');

      axios.post('/login', {
        ...loginData
      })
      .then(response => {
          localStorage.setItem('token', response.data.access_token);
          window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
          commit('loginStop', null);
          commit('updateAccessToken', response.data.access_token);
          router.push('/');
      })
      .catch(error => {
        commit('loginStop', error.response.data.message);
        commit('updateAccessToken', null);
      })
    },
    fetchAccessToken({commit}) {
      commit('updateAccessToken', localStorage.getItem('token'));
    },
    logout({commit}) {
      localStorage.removeItem('token')
      commit('logout')
      router.push('/login');
    }
  },
  modules: {
  }
})
