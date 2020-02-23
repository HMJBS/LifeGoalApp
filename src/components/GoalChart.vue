<template>

  <div id='chart'>
    <h1>{{ userName }}'s Life Goal</h1>
  <TreeChart :json='goalsData' />
  </div>

</template>

<script>

  import TreeChart from 'vue-tree-chart'

  export default {
    components: {
      TreeChart
    },
    name: 'GoalChart',
    props: {
      userName: String,
      goalsData: Object
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
