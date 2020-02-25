<template>

  <div id='chart'>
    <TreeChart v-if='objectsJson' :json='objectsJson' />
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
    name: 'GoalChart',
    mounted() {

    }
  }


</script>

<style scoped>

table {
  width: 100%;
  border: 2px solid Black;
}

tbody tr:nth-child(odd) {
  background-color: LightGrey;
}

tbody tr:nth-child(even) {
  background-color: White;
}

tbody td {
  border-style: none;
  padding-left: 0;
  padding-right: 0;
}

</style>
