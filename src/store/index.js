import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    /**
     * user's Name
     * passed to REST /{username}
     * @type {String}
     */
    userName: '',

    /**
     * user's objects
     * formatted for tree templete
     * @type {Object}
     */
    lifeObjects: {}
  },
  mutations: {

    setUserName(state, payload) {
      state.userName = payload.userName;
    },

    setLifeObjects(state, payload) {
      state.lifeObjects = payload.lifeObjects;
    }

  },
  actions: {
    async getLIfeObjectByCurrentUser({ commit, state }) {

      try {

        const userName = state.userName;
        if (!userName) { throw `Invalid UserName ${userName}`; }
        const res = await axios.get(`http://localhost:7005/${state.userName}`);
        const { data } = res;
        commit('setLifeObjects', { lifeObjects: data });

      } catch (err) {

        throw err;
      }
    }
  },
  modules: {
  }
})
