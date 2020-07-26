<template>
  <div class="mb-4">
    <div class="justify-content-end">
      <b-icon-plus
        class="h2 add-button"
        variant="success"
        @click="showAddObjectModal(null)"
      />
    </div>
    <b-card-group
      v-if="objectsJson"
      id="life-objects-deck"
      class="d-flex flex-wrap"
      deck
    >
      <!-- Life Object layer -->
      <b-card
        v-for="lifeGoal in objectsJson.data.children"
        :key="lifeGoal._id"
        class="life-object-cards"
        :title="lifeGoal.name"
        :sub-title="lifeGoal.detail"
        header="Life Goal"
      >
        <div class="d-flex justify-content-end">
          <b-icon-plus
            class="h3 add-button"
            variant="success"
            @click="showAddObjectModal(lifeGoal._id)"
          />
          <b-icon-x
            class="h3 remove-button"
            variant="danger"
            @click="showDelObjectModal(lifeGoal._id, lifeGoal.name)"
          />
        </div>
        <b-card-text>Needed Skills</b-card-text>
        <!-- skillset layer -->
        <b-card
          v-for="skillset in lifeGoal.children"
          :key="skillset._id"
          :title="skillset.name"
          :sub-title="skillset.detail"
          header="Skillset"
        >
          <div class="d-flex justify-content-end">
            <b-icon-plus
              class="h3 add-button"
              variant="success"
              @click="showAddObjectModal(skillset._id)"
            />
            <b-icon-x
              class="h3 remove-button"
              variant="danger"
              @click="showDelObjectModal(skillset._id, skillset.name)"
            />
            <span
              v-b-toggle="`collapse-${skillset._id}`"
              class="expand-button"
            >
              <b-icon
                icon="arrow-down-short"
                class="h3 expand-button-expand"
              />
              <b-icon
                icon="arrow-up-short"
                class="h3 expand-button-collapse"
              />
            </span>
          </div>
          <!-- v-binding v-b-toggle don"t work -->

          <b-collapse
            :id="`collapse-${skillset._id}`"
            class="mb-2"
          >
            <!-- skill layer -->
            <b-card
              v-for="skill in skillset.children"
              :key="skill._id"
              :title="skill.name"
              :sub-title="skill.detail"
              header="Skill"
            >
              <div class="d-flex justify-content-end">
                <b-icon-plus
                  class="h3 add-button"
                  variant="success"
                  @click="showAddObjectModal(skill._id)"
                />
                <b-icon-x
                  class="h3 remove-button"
                  variant="danger"
                  @click="showDelObjectModal(skill._id, skill.name)"
                />
                <span
                  v-b-toggle="`collapse-${skill._id}`"
                  class="expand-button"
                >
                  <b-icon
                    icon="arrow-down-short"
                    class="h3 expand-button-expand"
                  />
                  <b-icon
                    icon="arrow-up-short"
                    class="h3 expand-button-collapse"
                  />
                </span>
              </div>
              <b-collapse
                :id="'collapse-' + skill._id"
                class="mb-2"
              >
                <!-- study layer -->
                <b-card
                  v-for="study in skill.children"
                  :key="study._id"
                  :title="study.name"
                  :sub-title="study.detail"
                  header="Study"
                >
                  <div class="d-flex justify-content-end">
                    <b-icon-x
                      class="h3 remove-button"
                      variant="danger"
                      @click="showDelObjectModal(study._id, study.name)"
                    />
                  </div>
                </b-card>
              </b-collapse>
            </b-card>
          </b-collapse>
        </b-card>
      </b-card>
    </b-card-group>

    <b-modal
      :id="ADD_MODAL_ID"
      title="Add new object"
      @ok="registerNewObject"
    >
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
          />
        </b-form-group>
        <b-form-group
          id="input-group-detail"
          label="Detail"
          label-for="textarea-new-object-detail"
        >
          <b-form-textarea
            id="textarea-new-object-detail"
            v-model="newObjectDetail"
            placeholder="Details of your life object."
            rows="3"
            max-rows="6"
          />
        </b-form-group>

        <b-form-group
          id="input-group-deadlilne"
          label="Deadline"
          label-for="datepicker-deadline"
        />
        <b-form-datepicker
          id="datepicker-deadline"
          v-model="newObjectDeadline"
          inline
        />
        <b-button
          id="datepicker-clear-button"
          variant="primary"
          @click="newObjectDeadline = null"
        >
          Clear
        </b-button>
        <b-form-group>
          <b-form-checkbox
            id="finished-checkbox"
            v-model="newObjectFinished"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
          >
            Already finished?
          </b-form-checkbox>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal
      :id="DEL_MODAL_ID"
      title="delete Object"
      @ok="deleteObject"
    >
      <h1>Deleting object {{ deletingObjectName }}. Sure?</h1>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'GoalChart',
  components: {},
  data () {
    return {
      // new life object"s name
      newObjectName: '',
      newObjectDetail: '',
      newObjectFinished: 'false',
      newObjectDeadline: null,
      parentId: '',
      deletingObjectName: '',
      deletingObjectId: '',
      ADD_MODAL_ID: 'addModal',
      DEL_MODAL_ID: 'delModal'
    }
  },
  computed: {
    objectsJson () {
      return this.$store.state.lifeObjects
    },
    userName () {
      return this.$store.state.userName
    }
  },
  methods: {
    showAddObjectModal: function (objectId) {
      this.parentId = objectId
      this.$bvModal.show(this.ADD_MODAL_ID)
    },
    hideObjectModal: function () {
      this.newObjectName = ''
      this.parentId = ''
      this.$bvModal.hide(this.ADD_MODAL_ID)
    },
    registerNewObject: function () {
      // check clikced node has children

      if (this.parentId === undefined) {
        throw new Error('this.parentId should not be undefined')
      }
      this.$store.dispatch('registerNewObject', {
        name: this.newObjectName,
        detail: this.newObjectDetail,
        deadline: this.newObjectDeadline,
        finished: this.newObjectFinished === 'true',
        parentId: this.parentId
      })

      this.$bvModal.hide('addObject')
      this.parentId = ''
      this.newObjectName = ''
      this.newObjectDetail = ''
      this.newObjectDeadline = null
      this.newObjectFinished = 'false'
    },

    showDelObjectModal: function (objectId, objectName) {
      this.deletingObjectName = objectName
      this.deletingObjectId = objectId
      this.$bvModal.show(this.DEL_MODAL_ID)
    },
    deleteObject: function () {
      this.$store.dispatch('removeObject', { objectId: this.deletingObjectId })
      this.deletingObjectName = ''
      this.deletingObjectId = ''
      this.newObjectDetail = ''
      this.newObjectDeadline = null
      this.newObjectFinished = 'false'
      this.$bvModal.hide(this.DEL_MODAL_ID)
      this.$store.dispatch('getLifeObjectByCurrentUser')
    }
  }
}
</script>

<style scoped>
svg.add-button:hover {
  background-color: lightcyan;
}

svg.remove-button:hover {
  background-color: rgb(238, 220, 213);
}

span.expand-button:hover {
  background-color: rgb(187, 187, 187);
}

.collapsed > .expand-button-collapse,
:not(.collapsed) > .expand-button-expand {
  display: none;
}

.life-object-cards {
  min-width: 20rem;

}
</style>
