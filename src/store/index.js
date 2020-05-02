import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import LifeObject from './LifeObject.js'

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
     * @type {LifeObject}
     */
    lifeObjects: null
  },
  mutations: {

    setUserName(state, payload) {
      state.userName = payload.userName;
    },

    setLifeObjects(state, payload) {
      state.lifeObjects = new LifeObject(payload.lifeObjects, state.userName);
    }

  },
  actions: {
    async getLifeObjectByCurrentUser({ commit, state }) {

      try {

        const userName = state.userName;
        if (!userName) { throw `Invalid UserName ${userName}`; }

        console.log(`GET /user/${state.userName}`);

        const res = await ax.get(`/user/${state.userName}`);
        const lifeObjects = res.data.lifeObjects;

        commit('setLifeObjects', { lifeObjects });

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
    },

    /**
     * register new life object under given lifeObject
     * @param {*} param0 vuex internal variable
     * @param {String} name content of life object
     * @param {String} parentId Id of parent life object
     */
    async registerNewObject( { state, commit }, name, finished, parentId ) {

      let result;

      const payload = {
        name,
        finished,
      };

      // call API
      try {        

        if( parentId ) {

          // add new life object to non-root object
          result = await ax.put(`/user/${this.userName}/${parentId}`, payload);
        
        } else {

          // add new life object to root
          result = await ax.put(`/user/${this.userName}`, payload);

        }
      } catch (err) {
        throw err;
      }

      if (result.status !== 200) {

        console.error(`[registerNewObject] failed with ${result.status}`);
        return false;

      }

      // after API return success, put new life object to local tree
      // TODO: implement above function
      });
    }
  }
});