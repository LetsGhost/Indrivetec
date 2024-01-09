<template>
  <main>
    <TabelHeadComponent />
    <div class="line" v-for="(line, index) in lineDataArray" :key="index">
      <TabelLineComponent
        :lineData="line"
        :editModus="editModus"
        @updateLineData="updateLineData"
      />
      <!-- delet button -->
      <div class="delet-line" v-if="editModus" @click="deletLine(index)">
        <font-awesome-icon :icon="['fas', 'trash-alt']" />
      </div>
      <!-- alert -->
      <div class="alert-container" v-if="showAlert">
        <div class="alert">
          <p>Wollen Sie die Zeile wirklich löschen?</p>
          <div class="button-container">
            <div class="button delet" @click="deleteLineRealy()">
              <p>Löschen</p>
            </div>
            <div class="button" @click="deletLine()">
              <p>Abbrechen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- save edit button -->
    <button class="button" v-if="editModus" @click="saveEdit()">Änderungen speichern</button>
    <FootlineComponent
      :arrayCount="lineDataArray.length"
      @addLine="addNewLine"
      @toggleEditModus="toggleEditModus"
      :editModus="editModus"
    />
  </main>
</template>

<script>
import { ref } from 'vue'
import TabelHeadComponent from './ExtraComponents/TabelHeadComponent.vue'
import TabelLineComponent from './ExtraComponents/TabelLineComponent.vue'
import FootlineComponent from './FootlineComponent.vue'

export default {
  components: {
    TabelHeadComponent,
    TabelLineComponent,
    FootlineComponent
  },
  setup() {
    // array with all line data
    const lineDataArray = ref([])
    // other variables
    const editModus = ref(false)
    const showAlert = ref(false)
    const newLineData = ref([])

    // add new line to tabel
    const addNewLine = (lineData) => {
      lineDataArray.value.push(lineData)
    }

    // edit tabel
    const toggleEditModus = () => {
      editModus.value = !editModus.value
    }

    const currentIndex = ref(null)

    // delet line
    const deletLine = (index) => {
      showAlert.value = !showAlert.value
      currentIndex.value = index
    }
    const deleteLineRealy = () => {
      showAlert.value = !showAlert.value
      lineDataArray.value.splice(currentIndex.value, 1)
      window.electron.send('delete-data', currentIndex.value)
    }

    const updateLineData = (lineData) => {
      newLineData.value.push(lineData)
    }

    const saveEdit = () => {
      editModus.value = !editModus.value
      console.log(newLineData.value)
      //window.electron.send('update-data', newLineData)
    }

    return {
      addNewLine,
      lineDataArray,
      toggleEditModus,
      editModus,
      deletLine,
      deleteLineRealy,
      showAlert,
      saveEdit,
      updateLineData
    }
  },

  mounted() {
    // This code will run when the component is mounted to the DOM
    window.electron.send('load-data')
    window.electron.receive('load-data', (data) => {
      for (let object in data) {
        this.lineDataArray.push(data[object])
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

main {
  @include center();
  gap: 1rem;
  width: 100%;

  .line {
    display: flex;
    width: 100%;

    .delet-line {
      @include center();
      padding: 1rem;
      background-color: $highlight-clr-grey;
      border-radius: 0.75rem;
      color: $highlight-clr-red;
      font-size: 1.3em;
      cursor: pointer;
      &:hover {
        background-color: $highlight-clr-red;
        color: $text-clr-white;
      }
      &:active {
        scale: 0.95;
      }
    }

    .alert-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      @include center();
      height: 100vh;
      width: 100vw;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);

      .alert {
        @include center();
        flex-direction: column;
        padding: 2.5rem;
        gap: 2rem;
        background-color: $highlight-clr-grey;
        border-radius: 0.75rem;

        p {
          margin: 0;
          text-align: center;
          font-size: 1.5em;
          font-weight: 400;
        }

        .button-container {
          @include center();
          gap: 0.5rem;

          p {
            margin: 0;
            font-size: 1em;
            font-weight: 400;
          }

          .delet {
            background-color: $background-clr-white;
            color: $text-clr-black;
            &:hover {
              background-color: $company-clr-green;
              color: $text-clr-white;
            }
          }
        }
      }
    }
  }
}
</style>
