import iconByDepth from '@/assets/iconByDepth.json';

export default class LifeObject {

  constructor(listLifeObjects, userName) {

    /**
     * tree-structured life objects
     */
    this.data = {};

    this.buildTreeStruct(listLifeObjects, userName);
  }

  /**
   * create tree-structured object for vue-tree
   * @param {Array} listLifeObjects raw array listLifeObjects from GET /user/:userName
   * @param {String} userName
   * @returns {Object} tree object readable by tree-vue 
   */
  buildTreeStruct(listLifeObjects, userName) {

    const tree = {
      name: `${userName}'s Life Object`,
      children: [],
    };
  
    const depthSorted = [];
  
    // sorts elements by layer depth
    listLifeObjects.forEach((elem) => {
  
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
          clonedNode.image_url = iconByDepth[0];
  
          // clear children, it must be tree structure
          clonedNode.children = [];
          tree.children.push(clonedNode);
  
        } else {
  
          // add image_url
          clonedNode.image_url = iconByDepth[cloneDepth];
  
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
  
            /* eslint-disable no-console*/
            console.error(`[buildTreeStruct] Node without parent`);
            console.error(clonedNode);
            /* eslint-enable no-console */
            return;
  
          } 
  
          parentNode.children.push(clonedNode);
        }
      });
    });
    
    this.data = tree;
  }
}

