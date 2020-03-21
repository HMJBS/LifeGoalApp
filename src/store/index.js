import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const ax = axios.create({
  baseURL: `http://${process.env.VUE_APP_BE_HOST}:${process.env.VUE_APP_BE_PORT}/`,
  timeout: 1000
});

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
        const res = await ax.get(`/user/${state.userName}`);
        const { data } = res;
        const objLifeObjects = JSON.parse( data.lifeObjects );
        commit('setLifeObjects', { lifeObjects: objLifeObjects });

      } catch (err) {

        throw err;
      }
    },

    registerNewUser({ commit }, userName) {

      return new Promise( (resolve, reject) => {

        // post by given userName first
        ax.post('/user', {
          userName
        }).then(() => {
          commit('setUserName', { userName });
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }
});
