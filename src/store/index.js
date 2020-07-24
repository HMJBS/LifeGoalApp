import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import LifeObject from './LifeObject.js'

const ax = axios.create({
  baseURL: `http://${process.env.VUE_APP_BE_HOST}:${process.env.VUE_APP_BE_PORT}/`,
  timeout: 1000,
  withCredentials: true
})

/* eslint-disable no-console */

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    /**
     * Logined?
     * @type {Boolean}
     */
    isLogin: false,

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

    setUserName (state, newUsername) {
      state.userName = newUsername
    },

    setLifeObjects (state, payload) {
      state.lifeObjects = new LifeObject(payload.lifeObjects, state.userName)
    },
    clearLifeObjects (state) {
      state.lifeObjects = null
    },

    setNewLifeObject (state, payload) {
      state.lifeObjects.appendNewLifeObject(
        payload.name, payload.finished, payload.id, payload.parentId
      )
    },

    /**
     *
     * @param {*} state Vuex state object
     * @param {String} id deleting life object's id
     */
    deleteLifeObject (state, id) {
      state.lifeObjects.deleteLifeObject(id)
    },

    setIsLogin (state, value) {
      state.isLogin = value
    }

  },
  actions: {
    async getLifeObjectByCurrentUser ({ commit, state }) {
      const userName = state.userName
      if (!userName) { throw new Error(`Invalid UserName ${userName}`) }

      console.log(`GET /user/${state.userName}`)

      const res = await ax.get(`/user/${state.userName}`)
      const lifeObjects = res.data.lifeObjects

      commit('setLifeObjects', { lifeObjects })
    },

    async registerNewUser (store, { userName, password }) {
      await ax.post('/user', { userName, password })
    },

    async login ({ commit, dispatch }, { userName, password }) {
      await ax.post('/login', { userName, password })
      commit('setIsLogin', true)
      commit('setUserName', userName)
      commit('clearLifeObjects')
      dispatch('getLifeObjectByCurrentUser')
    },

    async logout ({ commit }) {
      await ax.get('/logout')
      commit('setIsLogin', false)
      commit('setUserName', '')
      commit('clearLifeObjects')
    },

    /**
     * register new life object under given lifeObject
     * @param {*} param0 vuex internal variable
     * @param {String} name content of life object
     * @param {Boolean} finsihed is finished
     * @param {String} parentId Id of parent life object
     */
    async registerNewObject ({ state, commit }, { name, finished, parentId }) {
      if (typeof parentId === 'undefined') { throw new Error('parentId is undefined, use null instead') }

      const payload = {
        name,
        finished
      }

      console.log(payload)

      // call API
      let result
      try {
        if (parentId) {
          // add new life object to non-root object
          result = await ax.put(`/user/${state.userName}/${parentId}`, payload)
        } else {
          // add new life object to root
          result = await ax.put(`/user/${state.userName}`, payload)
        }
      } catch (err) {
        throw new Error('failed to call API', err)
      }

      // after API return success, put new life object to local tree
      commit('setNewLifeObject', { name, finished, parentId, id: result.data._id })
    },

    /**
     * Remove lifeObject from tree
     * @param {*} param0 vuex dummy object
     * @param {String} param1 lifeObject's Id to remove
     */
    async removeObject ({ state, dispatch }, { objectId }) {
      try {
        if (!objectId) throw Error('passed undefined as ojectId')
        await ax.delete(`/user/${state.userName}/${objectId}`)
      } catch (err) {
        // if server response with unsuceesful code, catched here.
        console.error('[removeObject] request failed, unknown reason.')
        console.error(err)
        throw new Error('remove object API failed', err)
      }
      // get new object tree from server
      dispatch('getLifeObjectByCurrentUser')
    }
  }
})
