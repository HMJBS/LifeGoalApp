<template>

  <div id='chart'>
    <TreeChart v-if='objectsJson' :json='objectsJson' @click-node="addObjectModal" />
    <modal name="addObject" :draggable="true" :resizable="true">
      <h2>Add new Object</h2>
      <form>
        <label for="newObjectString">new object</label>
        <input id="newObjectString" type="text" v-model="newObjectStr">
        <input type="submit" value="Register" @click="registerNewObject" 
            @submit.prevent="registerNewObject" >
      </form>
        
    </modal>
  </div>

</template>

<script>

  import TreeChart from 'vue-tree-chart'

  export default {
    components: {
      TreeChart
    },
    computed: {
      objectsJson () {
        return this.$store.state.lifeObjects;
      }
    },
    data() {
      return {
        newObjectStr: ''
      }
    },
    name: 'GoalChart',
    methods: {
      addObjectModal: function() {
        this.$modal.show('addObject');
      },
      hideObjectModal: function() {
        this.$modal.hide('addObject');
      },
      registerNewObject: function() {
        
        // eslint-disable-next-line no-console
        console.log(this);
        // check clikced node has children
        if (this.children) {
          
          this.children.push({
            extend: true,
            finished: false,
            image_url: "study.png",
            name: this.newObjectStr
          });
          this.$store.commit('setLifeObject', {lifeObjects: this.children});
        }
        this.$modal.hide('addObject');
      }
    }
  }


</script>

<style scoped>

table {
  width: 100%;
  border: 2px solid Black;
  border-collapse: collapse;
  table-layout: fixed;
}

thead th{
  padding: 10px 5px;
  font: 1.5em sans-serif, bold;
}

tbody tr:nth-child(odd) {
  background-color: LightGrey;
}

tbody tr:nth-child(even) {
  background-color: White;
}

tbody tr {
  padding: 5px 3px;
  font: 1.2em serif;
}

</style>
