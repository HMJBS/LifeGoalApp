<template>

  <div id='chart'>
    <h1>{{ userName }}'s Life Goal</h1>
    <table>
      <thead>
        <tr>
          <th>Ultimate Goal</th>
          <th>Big Goal</th>
          <th>Needed Skill</th>
          <th>Must-do task</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value,key) in rawTable" v-bind:key="key" v-html="value">
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>

  export default {
    name: 'GoalChart',
    props: {
      userName: String,
      goalsData: Object
    },
    data() {
      return {
        rawTable: []
      }
    },
    created: function() {
      this.rawTable = this.generateCell(this.goalsData);
    },
    methods: {
      generateCell: function(cellObj){

        const selfTag = `<td>${cellObj.text}</td>`;
        let output = [];

        if (!cellObj.child) {
          // single tag output
          output.push(selfTag);
        } else {
          // multi row tag output
          cellObj.child.forEach((item, i) => {
            const childCallbackResult = this.generateCell(item);
            childCallbackResult.forEach((resultItem, j) => {
              if (i == 0 && j == 0) {
                output.push(selfTag + resultItem);
              } else {
                output.push('<td></td>' + resultItem);
              }
            });
          });
        }
        return output;
    }
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
