<template>
  <main>
    <!-- table main -->
    <table v-if="!editModus">
      <!-- head -->
      <tr>
        <div class="header left">
          <th v-for="(text, index) in headContentLeft" :key="index">
            {{ text }}
          </th>
        </div>
        <div class="header middle">
          <th v-for="(text, index) in headContentMiddle" :key="index">
            {{ text }}
          </th>
        </div>
        <div class="header right">
          <th v-for="(text, index) in headContentRight" :key="index">
            {{ text }}
          </th>
        </div>
        <div class="header header-end" v-if="editModus">
          <font-awesome-icon :icon="['fas', 'circle-minus']" />
        </div>
      </tr>
      <!-- body -->
      <div class="table-body">
        <tr v-for="(text, index) in lineDataArray" :key="index">
          <!-- left -->
          <div class="line left">
            <td>{{ text.idtCustomer }}</td>
            <td>{{ text.endCustomer }}</td>
            <td>{{ text.country }}</td>
            <td>{{ text.projectId }}</td>
            <td>{{ text.inverter }}</td>
            <td>{{ text.battery }}</td>
            <td>
              <div class="circle">
                <font-awesome-icon :icon="['fas', 'x']" v-if="text.mtrf === true" />
                <font-awesome-icon :icon="['fas', 'minus']" v-if="text.mtrf === false" />
              </div>
            </td>
            <td>
              <div class="circle">
                <font-awesome-icon :icon="['fas', 'x']" v-if="text.gmb === true" />
                <font-awesome-icon :icon="['fas', 'minus']" v-if="text.gmb === false" />
              </div>
            </td>
            <td>{{ text.thirdPartyCooperation }}</td>
            <td>
              <div class="circle">
                <font-awesome-icon :icon="['fas', 'x']" v-if="text.delivery === true" />
                <font-awesome-icon :icon="['fas', 'minus']" v-if="text.delivery === false" />
              </div>
            </td>
            <td>
              <div class="circle">
                <font-awesome-icon :icon="['fas', 'x']" v-if="text.commissioning === true" />
                <font-awesome-icon :icon="['fas', 'minus']" v-if="text.commissioning === false" />
              </div>
            </td>
            <td>{{ text.customerAcceptance }}</td>
          </div>
          <!-- middle -->
          <div class="line middle">
            <td>
              <div
                class="circle"
                :class="{
                  red: text.onlineOffline === false,
                  green: text.onlineOffline === true
                }"
              ></div>
            </td>
            <td>
              <div
                class="circle"
                :class="{
                  black: text.runOffIdleChargeDischarge.run === false,
                  green: text.runOffIdleChargeDischarge.run === true
                }"
              ></div>
              <font-awesome-icon
                :icon="['fas', 'minus']"
                v-if="text.runOffIdleChargeDischarge.idle === true"
                class="icon"
              />
              <font-awesome-icon
                :icon="['fas', 'arrow-up']"
                v-if="
                  text.runOffIdleChargeDischarge.charge === true &&
                  text.runOffIdleChargeDischarge.run === true &&
                  text.runOffIdleChargeDischarge.idle !== true
                "
                class="icon"
              />
              <font-awesome-icon
                :icon="['fas', 'arrow-down']"
                v-if="
                  text.runOffIdleChargeDischarge.charge !== true &&
                  text.runOffIdleChargeDischarge.run === true &&
                  text.runOffIdleChargeDischarge.idle !== true
                "
                class="icon"
              />
            </td>
            <td>
              <div class="circle" v-if="text.extControl === true">
                <font-awesome-icon :icon="['fas', 'x']" class="red-xmark" />
              </div>
            </td>
            <td>
              <div class="circle" :class="{ yellow: text.warning === true }"></div>
            </td>
            <td>
              <div class="circle" :class="{ red: text.fault === true }"></div>
            </td>
            <td>{{ text.soc }}</td>
          </div>
          <!-- right -->
          <div class="line right">
            <td>
              <a :href="text.remoteAccessIPAddress" target="_blank" class="button">Login</a>
            </td>
            <td>
              <a :href="text.location.link" target="_blank">
                {{ text.location.adress }}
              </a>
            </td>
          </div>
        </tr>
      </div>
    </table>

    <!-- table edit version -->
    <table v-if="editModus">
      <!-- head -->
      <tr>
        <div class="header left">
          <th v-for="(text, index) in headContentLeft" :key="index">
            {{ text }}
          </th>
        </div>
        <div class="header middle">
          <th v-for="(text, index) in headContentMiddle" :key="index">
            {{ text }}
          </th>
        </div>
        <div class="header right">
          <th v-for="(text, index) in headContentRight" :key="index">
            {{ text }}
          </th>
        </div>
        <div class="header header-end" v-if="editModus">
          <font-awesome-icon :icon="['fas', 'circle-minus']" />
        </div>
      </tr>
      <!-- body -->
      <div class="table-body">
        <tr v-for="(text, index) in lineDataArray" :key="index">
          <!-- left -->
          <div class="line left">
            <td>
              <input type="text" name="idtCustomer" v-model="text.idtCustomer" />
            </td>
            <td>
              <input type="text" name="endCustomer" v-model="text.endCustomer" />
            </td>
            <td>
              <input type="text" name="country" v-model="text.country" />
            </td>
            <td>
              <input type="text" name="projectId" v-model="text.projectId" />
            </td>
            <td>
              <input type="text" name="inverter" v-model="text.inverter" />
            </td>
            <td>
              <input type="text" name="battery" v-model="text.battery" />
            </td>
            <td>
              <label :for="`mtrf-${index}`" class="circle">
                <font-awesome-icon :icon="['fas', 'x']" v-if="text.mtrf" />
              </label>
              <input type="checkbox" name="mtrf" :id="`mtrf-${index}`" v-model="text.mtrf" />
            </td>
            <td>
              <label :for="`gmb-${index}`" class="circle">
                <font-awesome-icon :icon="['fas', 'x']" v-if="text.gmb" />
              </label>
              <input type="checkbox" name="gmb" :id="`gmb-${index}`" v-model="text.gmb" />
            </td>
            <td>
              <input
                type="text"
                name="thirdPartyCooperation"
                v-model="text.thirdPartyCooperation"
              />
            </td>
            <td>
              <label :for="`delivery-${index}`" class="circle">
                <font-awesome-icon :icon="['fas', 'x']" v-if="text.delivery" />
              </label>
              <input
                type="checkbox"
                name="delivery"
                :id="`delivery-${index}`"
                v-model="text.delivery"
              />
            </td>
            <td>
              <label :for="`commissioning-${index}`" class="circle">
                <font-awesome-icon :icon="['fas', 'x']" v-if="text.commissioning" />
              </label>
              <input
                type="checkbox"
                name="commissioning"
                :id="`commissioning-${index}`"
                v-model="text.commissioning"
              />
            </td>
            <td>
              <input type="text" name="customerAcceptance" v-model="text.customerAcceptance" />
            </td>
          </div>
          <!-- middle -->
          <div class="line middle">
            <td>
              <label
                :for="`onlineOffline-${index}`"
                class="circle"
                :class="{
                  red: text.onlineOffline === false,
                  green: text.onlineOffline === true
                }"
              ></label>
              <input
                type="checkbox"
                name="onlineOffline"
                :id="`onlineOffline-${index}`"
                v-model="text.onlineOffline"
              />
            </td>
            <td>
              <!-- run/ off -->
              <label
                :for="`run-${index}`"
                class="circle"
                :class="{
                  green: text.runOffIdleChargeDischarge.run,
                  black: text.runOffIdleChargeDischarge.run === false
                }"
              ></label>
              <input
                type="checkbox"
                name="run"
                :id="`run-${index}`"
                v-model="text.runOffIdleChargeDischarge.run"
              />
              <!-- idle/ charge/ discharge -->
              <span>
                <!-- idle -->
                <label :for="`idle-${index}`">
                  <font-awesome-icon
                    :icon="['fas', 'minus']"
                    class="icon"
                    :class="{ grey: text.runOffIdleChargeDischarge.idle }"
                  />
                </label>
                <input
                  type="checkbox"
                  name="idle"
                  :id="`idle-${index}`"
                  v-model="text.runOffIdleChargeDischarge.idle"
                />
                <!-- charge -->
                <label :for="`charge-${index}`">
                  <font-awesome-icon
                    :icon="['fas', 'arrow-up']"
                    class="icon"
                    :class="{
                      grey:
                        text.runOffIdleChargeDischarge.charge &&
                        !text.runOffIdleChargeDischarge.idle
                    }"
                  />
                </label>
                <input
                  type="checkbox"
                  name="idle"
                  :id="`charge-${index}`"
                  v-model="text.runOffIdleChargeDischarge.charge"
                />
                <!-- discharge -->
                <label :for="`discharge-${index}`">
                  <font-awesome-icon
                    :icon="['fas', 'arrow-down']"
                    class="icon"
                    :class="{
                      grey:
                        !text.runOffIdleChargeDischarge.charge &&
                        !text.runOffIdleChargeDischarge.idle
                    }"
                  />
                </label>
                <input
                  type="checkbox"
                  name="idle"
                  :id="`discharge-${index}`"
                  v-model="text.runOffIdleChargeDischarge.charge"
                />
              </span>
            </td>
            <td>
              <label :for="`extControl-${index}`" class="circle">
                <font-awesome-icon :icon="['fas', 'x']" class="red-xmark" v-if="text.extControl" />
              </label>
              <input
                type="checkbox"
                name="extControl"
                :id="`extControl-${index}`"
                v-model="text.extControl"
              />
            </td>
            <td>
              <label :for="`warning-${index}`" class="circle" :class="{ yellow: text.warning }">
              </label>
              <input
                type="checkbox"
                name="warning"
                :id="`warning-${index}`"
                v-model="text.warning"
              />
            </td>
            <td>
              <label :for="`fault-${index}`" class="circle" :class="{ red: text.fault }"> </label>
              <input type="checkbox" name="fault" :id="`fault-${index}`" v-model="text.fault" />
            </td>
            <td>
              <input type="text" name="" id="" v-model="text.soc" />
            </td>
          </div>
          <!-- right -->
          <div class="line right">
            <td>
              <input type="text" name="idtCustomer" v-model="text.remoteAccessIPAddress" />
            </td>
            <td>
              <span>
                <input type="text" name="idtCustomer" v-model="text.location.adress" />
                <input type="text" name="idtCustomer" v-model="text.location.link" />
              </span>
            </td>
          </div>
          <!-- delet button -->
          <div class="delet-line" @click="toggleDeletAlert()">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </div>
          <!-- alert -->
          <div class="alert-container" v-if="showAlert">
            <div class="alert">
              <p>Wollen Sie die Zeile wirklich löschen?</p>
              <div class="button-container">
                <div class="button delet" @click="deletLine(index)">
                  <p>Löschen</p>
                </div>
                <div class="button" @click="toggleDeletAlert()">
                  <p>Abbrechen</p>
                </div>
              </div>
            </div>
          </div>
          <!-- alert edit end -->
          <div class="success-container" v-if="deletSuccess">
            <span>
              <p>Line erfolgreich gelöscht</p>
              <font-awesome-icon :icon="['fas', 'check']" class="check-icon" />
            </span>
            <div class="progress"></div>
          </div>
        </tr>
      </div>
    </table>

    <!-- save edit button -->
    <button class="save-edit button" v-if="editModus" @click="saveEdit()">
      Änderungen speichern
    </button>

    <!-- alert edit end -->
    <div class="success-container" v-if="editSaved">
      <span>
        <p>erfolgreich gespeichert</p>
        <font-awesome-icon :icon="['fas', 'check']" class="check-icon" />
      </span>
      <div class="progress"></div>
    </div>

    <FootlineComponent
      :arrayCount="lineDataArray.length"
      @addLine="addNewLine"
      @toggleEditModus="toggleEditModus"
      :editModus="editModus"
    />
  </main>
</template>

<script>
import { ref, computed } from 'vue'
import FootlineComponent from './FootlineComponent.vue'

export default {
  components: {
    FootlineComponent
  },
  setup() {
    // arrays with all tabel head data
    const headContentLeft = ref([
      'IDT Customer',
      'End Customer',
      'Country',
      'Project ID',
      'Inverter',
      'Battery',
      'MTRF',
      'GMB',
      '3ᵗʰ party cooperat',
      'Deliv.',
      'Comm.',
      'Customer acceptance'
    ])
    const headContentMiddle = ref([
      'Online Offline',
      'Run•OFF idle•charge• discharge',
      'external control',
      'Warning',
      'Fault',
      'SoC'
    ])
    const headContentRight = ref(['Remote Access IP-Address', 'Location'])
    // array with all line data
    const lineDataArray = ref([])
    // other variables
    const editModus = ref(false)
    const showAlert = ref(false)
    const newLineData = ref([])
    const editSaved = ref(false)
    const deletSuccess = ref(false)

    // add new line to tabel
    const addNewLine = (lineData) => {
      lineDataArray.value.push(lineData)
    }

    // edit tabel
    const toggleEditModus = () => {
      editModus.value = !editModus.value
    }

    // delet line
    const toggleDeletAlert = () => {
      showAlert.value = !showAlert.value
    }

    const deletLine = (index) => {
      lineDataArray.value.splice(index, 1)
      showAlert.value = !showAlert.value
      deletSuccess.value = !deletSuccess.value
      setTimeout(() => {
        deletSuccess.value = !deletSuccess.value
      }, 1800)
      window.electron.send('delete-data', index)
    }

    // save edit

    const saveEdit = () => {
      editModus.value = !editModus.value
      editSaved.value = !editSaved.value
      setTimeout(() => {
        editSaved.value = !editSaved.value
      }, 1800)
      // just give data from lineDataArray to a newLineData array
      newLineData.value = lineDataArray.value // <- save the newLineData
      window.electron.send('update-data', JSON.stringify(newLineData.value))
    }

    return {
      lineDataArray,
      headContentLeft,
      headContentMiddle,
      headContentRight,
      addNewLine,
      toggleEditModus,
      editModus,
      deletLine,
      toggleDeletAlert,
      showAlert,
      saveEdit,
      newLineData,
      editSaved,
      deletSuccess
    }
  },

  mounted() {
    // This code will run when the component is mounted to the DOM
    window.electron.send('load-data')
    window.electron.receive('load-data', (data) => {
      for (let key in data) {
        console.log(data[key].onlineOffline)
        fetch(data[key].remoteAccessIPAddress, { mode: 'no-cors' })
          .then(() => {
            data[key].onlineOffline = true
            console.log('ok')
          })
          .catch(() => {
            data[key].onlineOffline = true
            console.log('not ok')
          })
        this.lineDataArray.push(data[key])
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';
@import '../../styles/alert.scss';

main {
  @include center();
  gap: 1rem;
  width: 100%;

  table {
    @include center();
    flex-direction: column;
    width: 100%;
    border-collapse: collapse;

    tr {
      @include center();
      width: 100%;

      //table basics

      th {
        @include center();
        height: 100%;
        width: 100%;
        font-weight: 400;
      }

      td {
        position: relative;
        @include center();
        gap: 0.5rem;
        height: 100%;
        width: 100%;
      }

      // header

      .header {
        @include center();
        margin: 0 1.5rem 0 0rem;
        height: 4rem;
        background-color: $table-clr-header;
        border-radius: 0.75rem;
      }

      // body

      .line {
        @include center();
        margin: 1rem 1rem 1rem 0rem;
        height: 4rem;
        border-bottom: solid 2px $table-clr-stroce;

        span {
          @include center();
          flex-direction: column;

          input[type='text'] {
            width: 80%;
          }
        }

        input {
          width: 100%;
        }

        input[type='checkbox'] {
          position: absolute;
          display: none;
        }

        label {
          cursor: pointer;
          &:hover {
            scale: 1.05;
          }
          &:active {
            scale: 0.95;
          }
        }

        .circle {
          $size: 2.5rem;
          @include center();
          width: $size;
          height: $size;
          border-radius: 50%;
          background-color: $highlight-clr-grey;
          font-size: 1.3em;

          .red-xmark {
            color: $highlight-clr-red;
          }
        }

        // breakepoints
        @media screen and (max-width: 1400px) {
          .circle {
            $size: 2rem;
            width: $size;
            height: $size;
          }
        }

        @media screen and (max-width: 1200px) {
          .circle {
            $size: 1.5rem;
            width: $size;
            height: $size;
          }
        }

        @media screen and (max-width: 950px) {
          .circle {
            $size: 1rem;
            width: $size;
            height: $size;
          }
        }

        .icon {
          padding: 0.25rem;
          border-radius: 100%;
          font-size: 1.3em;
        }

        .button {
          color: $text-clr-white;
          &:hover {
            color: $company-clr-green;
          }
        }

        a {
          text-decoration: none;
          color: $text-clr-black;
        }

        // colors

        .green {
          background-color: $highlight-clr-green;
        }

        .yellow {
          background-color: $highlight-clr-yellow;
        }

        .red {
          background-color: $highlight-clr-red;
        }

        .black {
          background-color: $text-clr-black;
        }

        .grey {
          background-color: $highlight-clr-grey;
        }
      }

      .header-end {
        padding: 0.25rem 1rem;
        height: 4rem;
        color: $highlight-clr-red;
        font-size: 1.3em;
      }

      .delet-line {
        @include center();
        padding: 1rem;
        margin: 0 0.25rem;
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

      // width

      .left {
        padding: 0.25rem 0.5rem 0.25rem 0.5rem;
        width: 55%;
      }

      .middle {
        padding: 0.25rem 0.5rem 0.25rem 0.5rem;
        width: 35%;
      }

      .right {
        padding: 0.25rem 0.5rem 0.25rem 0.5rem;
        width: 15%;
      }
    }

    .table-body {
      margin-top: 1rem;
      width: 100%;
      max-height: 60vh;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  .save-edit {
    position: absolute;
    bottom: 2rem;
    z-index: 10;
  }
}
</style>
