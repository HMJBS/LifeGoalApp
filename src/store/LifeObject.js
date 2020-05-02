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

      // copy cloneDepth.children -> cloneDepth.ref_children
      // original cloneDepth.children is overwriten by actual child instance
      elem.ref_children = elem.children;

      // clear old chldren array
      elem.children = [];
  
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
          tree.children.push(clonedNode);
  
        } else {

          // add image_url
          clonedNode.image_url = iconByDepth[cloneDepth];
  
          let parentNode = null;
          let isFound = false;
  
          // search parent node by "_id"
  
          if (cloneDepth === 1) {
  
            tree.children.forEach((element1) => {
  
              if (!isFound) {

                const result = element1.ref_children.find(element2 => element2 === clonedNode._id);
                if (result) {

                  // if current element has target id, this element should be parent
                  parentNode = element1;
                  isFound = true;
                }
              }
            });
  
          } else if (cloneDepth === 2) {
  
            tree.children.forEach((element1) => {
              element1.children.forEach((element2) => {
  
                if (!parentNode) {
                  const result = element2.ref_children.find(element3 => element3 === clonedNode._id);
                  if (result) {

                    // if current element has target id, this element should be parent
                    parentNode = element2;
                    isFound = true;
                  }
                }
              });
            });
  
          } else if (cloneDepth === 3) {
  
            tree.children.forEach((element1) => {
              element1.children.forEach((element2) => {
                element2.children.forEach((element3) => {
  
                  if (!parentNode) {
                    const result = element3.ref_children.find(element4 => element4 === clonedNode._id);
                    if (result) {

                      // if current element has target id, this element should be parent
                      parentNode = element3;
                      isFound = true;
                    }
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

  /**
   * add new LifeObject to local tree
   * @param {String} name life object name, titile in tree-chart
   * @param {Boolean} finished is life object finished its goal?
   * @param {Number} id id of new life object, returns from DB
   * @param {Number} [parentId] parent
   * @returns {Boolean} is success?
   */
  appendNewLifeObject(name, finished, id, parentId) {

    let target;
    if (parentId) {

      // search lifeObject with given parentId from this.tree
      target = this.inspectLifeObjectTree(this.data, parentId);

      // if target not found, abort
      if (!target) {

        /* eslint-disable-next-line no-console */
        console.error(`[appendNewLifeObject] No such lifeobject ${parentId}`);
        return false;

      }

    } else {

      // appending new life object to root
      target = this.data;
    }

    // add new life object
    if (!target.children) {

      target.children = [];
    }

    target.children.push({
      _id: id,
      name,
      finished,
    });

    return true;
  }

  /**
   * inspect root life object of targetTree,
   * if targetTree has children, inspect it recursively.
   * returns link to target life object if exist
   * @param {Object} targetTree 
   * @param {Number} targetId 
   * @returns {Object|null}
   * @private
   */
  inspectLifeObjectTree(targetTree, targetId) {

    console.debug(`[inspectLifeObject] target=${targetTree.name} id=${targetTree._id}`);
    console.debug(`targetTree._id === targetId -> ${targetTree._id === targetId}`)
    // check targetTree's root is target
    if (targetTree._id === targetId) {

      // return link to target life object node
      return targetTree;

    }

    // check target Tree is branch
    if (targetTree.children) {

      let result;
      for (const child of targetTree.children) {
        
        result = this.inspectLifeObjectTree(child, targetId);
        console.debug(`[inspectLifeObject] retruns=${result}`);
        
        // if child call returns tree object, it means target found,
        // therefore, just return result.
        if (result) {
          break;
        }
      }
      return result;

    }

    // target tree is leaf / no children are target
    return null;
  }
}

