<template>
  <div class="mb-4">
    I'm here.
    <b-card-group deck v-if="objectsJson">
      <!-- Life Object layer -->
      <b-card
        v-for="lifeGoal in objectsJson.data.children"
        v-bind:key="lifeGoal._id"
        class="life-object-cards"
        v-bind:title="lifeGoal.name"
        sub-title="None"
      >
        <div class="d-flex justify-content-end">
          <b-icon-plus v-on:click="showAddObjectModal(lifeGoal._id)" class="h3 add-button" variant="success" />
          <b-icon-x class="h3 remove-button" variant="danger" />
        </div>
        <b-card-text>Needed Skills</b-card-text>
        <!-- skillset layer -->
        <b-card
          v-for="skillset in lifeGoal.children"
          :key="skillset._id"
          :title="skillset.name"
          sub-title="REBOK I guess."
        >
          <div class="d-flex justify-content-end">
            <b-icon-plus v-on:click="showAddObjectModal(skillset._id)" class="h3 add-button" variant="success" />
            <b-icon-x class="h3 remove-button" variant="danger" />
            <b-icon icon="arrow-down-short" v-b-toggle="`collapse-${skillset._id}`" class="h3" />
          </div>
          <!-- v-binding v-b-toggle don"t work -->

          <b-collapse class="mb-2" :id="`collapse-${skillset._id}`">
            <!-- skill layer -->
            <b-card
              v-for="skill in skillset.children"
              :key="skill._id"
              :title="skill.name"
              sub-title="Goup"
            >
              <div class="d-flex justify-content-end">
                <b-icon-plus v-on:click="showAddObjectModal(skill._id)" class="h3 add-button" variant="success" />
                <b-icon-x class="h3 remove-button" variant="danger" />
                <b-icon b-icon icon="arrow-down-short" v-b-toggle="'collapse-' + skill._id" class="h3" />
              </div>
              <b-collapse :id="'collapse-' + skill._id " class="mb-2">
                <!-- study layer -->
                <b-card
                  v-for="study in skill.children"
                  :key="study._id"
                  :title="study.name"
                  sub-title="Read'em All"
                >
                  <div class="d-flex justify-content-end">
                    <b-icon-x class="h3 remove-button" variant="danger" />
                  </div>
                </b-card>
              </b-collapse>
            </b-card>
          </b-collapse>
        </b-card>
      </b-card>
    </b-card-group>

        <b-modal :id="ADD_MODAL_ID" title="Add new object" @ok="registerNewObject">
      <b-form>

        <b-form-group
          id="input-group-new-object"
          label="New Life Object"
          label-for="input-new-object-string"
        >
          <b-form-input
            id="input-new-object-string"
            v-model="newObjectName"
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

export default {
  name: 'GoalChart',
  components: {
  },
  computed: {
    objectsJson() {
      return this.$store.state.lifeObjects;
    }
  },
  data() {
    return {
      // new life object"s name
      newObjectName: "",
      newObjectId: "",
      ADD_MODAL_ID: 'addModal'
    };
  },
  methods: {
    showAddObjectModal: function(objectId) {
      this.newObjectId = objectId;
      this.$bvModal.show(this.ADD_MODAL_ID);
    },
    hideObjectModal: function() {
      this.newObjectName = "";
      this.newObjectId = "";
      this.$bvModal.hide(this.ADD_MODAL_ID);
    },
    registerNewObject: function() {
      // check clikced node has children
      this.$store.dispatch("registerNewObject", {
        name: this.newObjectName,
        finished: false,
        parentId: this.newObjectId
      });

      this.$modal.hide("addObject");
      this.newObjectId = "";
      this.newObjectName = "";
    },
    generateCollapseId: function(collapseId) {
      return "collapse-" + collapseId;
    }
  }
};
</script>

<style scoped>
  
</style>
