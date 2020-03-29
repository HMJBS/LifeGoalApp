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
