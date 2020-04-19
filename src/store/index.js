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

        console.log(`GET /user/${state.userName}`);

        const res = await ax.get(`/user/${state.userName}`);
        const { data } = res;
        const objLifeObjects = buildTreeStruct( data.lifeObjects, userName );

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

/**
 * create tree object used for vue-tree
 * @param {Array} lifeObjects raw array lifeObjects from GET /user/:userName
 * @param {String} userName
 * @returns {Object} tree object readable by tree-vue 
 */
function buildTreeStruct(lifeObjects, userName) {

  const tree = {
    name: `${userName}'s Life Object`,
    children: [],
  };

  const depthSorted = [];

  const imageByDepth = [
    "lifegoal.png",
    "skill.png",
    "knowledge.png",
    "study.png",
  ];

  // sorts elements by layer depth
  lifeObjects.forEach((elem) => {

    const depth = elem.layerDepth;
    if (!depthSorted[depth]) { depthSorted[depth] = []; }
    depthSorted[depth].push(elem);
  
  });

  // push elements to tree from deep element
  depthSorted.forEach((depth) => {

    depth.forEach((node) => {

      const clonedNode = {};
      const cloneDepth = node.layerDepth;

      // deep copy to clonedElem
      Object.assign(clonedNode, node);

      if (cloneDepth === 0) {

        // add image_url
        clonedNode.image_url = imageByDepth[0];

        // clear children, it must be tree structure
        clonedNode.children = [];
        tree.children.push(clonedNode);

      } else {

        // add image_url
        clonedNode.image_url = imageByDepth[cloneDepth];

        // clear children, it must be tree structure
        clonedNode.children = [];

        let parentNode = null;

        // search parent node by "_id"

        if (cloneDepth === 1) {

          tree.children.forEach((element1) => {

            if (!parentNode) {
              parentNode = element1.children.find(element2 => element2.id === clonedNode._id);
            }
          });

        } else if (cloneDepth === 2) {

          tree.children.forEach((element1) => {
            element1.children.forEach((element2) => {

              if (!parentNode) {
                parentNode = element2.children.find(element3 => element3.id === clonedNode._id);
              }
            });
          });

        } else if (cloneDepth === 3) {

          tree.children.forEach((element1) => {
            element1.children.forEach((element2) => {
              element2.children.forEach((element3) => {

                if (!parentNode) {
                  parentNode = element3.children.find(element4 => element4.id === clonedNode._id);
                }
              });
            });
          });

        }

        if (!parentNode) {

          console.error(`[buildTreeStruct] Node without parent`);
          console.error(clonedNode);
          return;

        } 

        parentNode.children.push(clonedNode);
      }
    });
  });
  return tree;
}