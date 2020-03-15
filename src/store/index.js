import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


/* eslint-disable no-console */

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
    async getLifeObjectByCurrentUser({ commit, state }) {

      try {

        const userName = state.userName;
        if (!userName) { throw `Invalid UserName ${userName}`; }
        console.log(`http://${process.env.VUE_APP_BE_HOST}:${process.env.VUE_APP_BE_PORT}/user/${state.userName}`);
        const res = await axios.get(`http://${process.env.VUE_APP_BE_HOST}:${process.env.VUE_APP_BE_PORT}/user/${state.userName}`);
        const { data } = res;
        const objLifeObjects = JSON.parse( data.lifeObjects );
        commit('setLifeObjects', { lifeObjects: objLifeObjects });

      } catch (err) {

        throw err;
      }
    },

    async registerNewUser({ commit }, userName) {

      try {
        // post by given userName first
        await axios.post('/user', {
          userName
        });
        commit('setUserName', { userName });

      } catch (err) {

        throw err;
      }
    }
  }
});
