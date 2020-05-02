<template>

  <div id='chart'>
    <TreeChart v-if='objectsJson' :json='objectsJson.data' @click-node="showAddObjectModal" />
    <b-modal id="addOjectModal" title="Add new object" @ok="registerNewObject">
      <b-form>

        <b-form-group
          id="input-group-new-object"
          label="New Life Object"
          label-for="input-new-object-string"
        >
          <b-form-input
            id="input-new-object-string"
            v-model="newObjectStr"
            type="text"
            required
            placeholder="New Object"
          ></b-form-input>
        </b-form-group>

      </b-form>
    </b-modal>
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
        newObjectStr: '',
        clickedNode: null
      }
    },
    name: 'GoalChart',
    methods: {
      showAddObjectModal: function(payload) {

        this.clickedNode = payload;
        this.$bvModal.show('addOjectModal');
      },
      hideObjectModal: function() {
        this.$bvModal.hide('addOjectModal');
      },
      registerNewObject: function() {
        
        // check clikced node has children
          
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
