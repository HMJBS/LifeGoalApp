<template>

  <div id='chart'>
    <h1>{{ userName }}'s Life Goal</h1>
  <TreeChart v-if='goalsData' :json='goalsData' />
  </div>

</template>

<script>

  import TreeChart from 'vue-tree-chart'
  import axios from 'axios'

  export default {
    components: {
      TreeChart
    },
    data() {
      return {
        goalsData: null,
      }
    },
    name: 'GoalChart',
    props: {
      userName: String
    },
    mounted() {
      axios.get('http://localhost:7005/lifeGoal.json').then((res) => {
        this.goalsData = res.data;
      });
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
