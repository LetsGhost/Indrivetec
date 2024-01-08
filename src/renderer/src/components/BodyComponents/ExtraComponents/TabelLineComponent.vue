<template>
  <main>
    <!-- tabel line -->
    <div class="line left" :class="{ 'left-width': editModus }">
      <span>
        <div class="highlight">
          <p v-if="!editModus">{{ first12Data.idtCustomer }}</p>
          <input type="text" v-model="first12Data.idtCustomer" v-if="editModus" />
        </div>
      </span>
      <span>
        <p v-if="!editModus">{{ first12Data.endCustomer }}</p>
        <input type="text" v-model="first12Data.endCustomer" v-if="editModus" />
      </span>
      <span class="smaller-width">
        <div class="highlight">
          <p v-if="!editModus">{{ first12Data.country }}</p>
          <input type="text" v-model="first12Data.country" v-if="editModus" />
        </div>
      </span>
      <span>
        <div class="highlight">
          <p v-if="!editModus">{{ first12Data.projectId }}</p>
          <input type="text" v-model="first12Data.projectId" v-if="editModus" />
        </div>
      </span>
      <span class="long-text">
        <p v-if="!editModus">{{ first12Data.inverter }}</p>
        <input type="text" v-model="first12Data.inverter" v-if="editModus" />
      </span>
      <span class="long-text">
        <p v-if="!editModus">{{ first12Data.battery }}</p>
        <input type="text" v-model="first12Data.battery" v-if="editModus" />
      </span>
      <span>
        <div class="wrapper" v-if="!editModus">
          <div class="circle" v-if="first12Data.mtrf === true">
            <font-awesome-icon :icon="['fas', 'x']" />
          </div>
        </div>
        <input type="checkbox" v-model="first12Data.mtrf" v-if="editModus" />
      </span>
      <span>
        <div class="wrapper" v-if="!editModus">
          <div class="circle" v-if="first12Data.gmb === true">
            <font-awesome-icon :icon="['fas', 'x']" />
          </div>
        </div>
        <input type="checkbox" v-model="first12Data.gmb" v-if="editModus" />
      </span>
      <span>
        <p v-if="!editModus">{{ first12Data.thirdPartyCooperation }}</p>
        <input type="text" v-model="first12Data.thirdPartyCooperation" v-if="editModus" />
      </span>
      <span>
        <div class="wrapper" v-if="!editModus">
          <div class="circle" v-if="first12Data.delivery === true">
            <font-awesome-icon :icon="['fas', 'x']" />
          </div>
        </div>
        <input type="checkbox" v-model="first12Data.delivery" v-if="editModus" />
      </span>
      <span>
        <div class="wrapper" v-if="!editModus">
          <div class="circle" v-if="first12Data.commissioning === true">
            <font-awesome-icon :icon="['fas', 'x']" />
          </div>
        </div>
        <input type="checkbox" v-model="first12Data.commissioning" v-if="editModus" />
      </span>
      <span>
        <p v-if="!editModus">{{ first12Data.customerAcceptance }}</p>
        <input type="text" v-model="first12Data.customerAcceptance" v-if="editModus" />
      </span>
    </div>
    <div class="line middle" :class="{ 'middle-width': editModus }">
      <span>
        <div class="wrapper" v-if="!editModus">
          <div class="circle" :class="{ green: second6Data.onlineOffline === true }"></div>
        </div>
        <input type="checkbox" v-model="second6Data.onlineOffline" v-if="editModus" />
      </span>
      <span>
        <div class="wrapper" v-if="!editModus">
          <div
            class="circle"
            :class="{
              green: second6Data.runOffIdleChargeDischarge.run === true
            }"
          ></div>
        </div>
        <input
          type="checkbox"
          v-model="second6Data.runOffIdleChargeDischarge.run"
          v-if="editModus"
        />
        <div class="wrapper" v-if="!editModus">
          <div v-if="second6Data.runOffIdleChargeDischarge.idle === true">
            <font-awesome-icon :icon="['fas', 'minus']" class="icon" />
          </div>
          <div
            v-if="
              second6Data.runOffIdleChargeDischarge.charge === true &&
              second6Data.runOffIdleChargeDischarge.run === true &&
              second6Data.runOffIdleChargeDischarge.idle !== true
            "
          >
            <font-awesome-icon :icon="['fas', 'arrow-up']" class="icon" />
          </div>
          <div
            v-if="
              second6Data.runOffIdleChargeDischarge.charge !== true &&
              second6Data.runOffIdleChargeDischarge.run === true &&
              second6Data.runOffIdleChargeDischarge.idle !== true
            "
          >
            <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon" />
          </div>
        </div>
        <div class="runOffIdleChargeDischarge-options" v-if="editModus">
          <label for="idle">idle</label>
          <input
            type="checkbox"
            id="idle"
            v-model="second6Data.runOffIdleChargeDischarge.idle"
            v-if="editModus"
          />
          <label for="charge">
            charge/ <br />
            discharg
          </label>
          <input
            type="checkbox"
            id="charge"
            v-model="second6Data.runOffIdleChargeDischarge.charge"
            v-if="editModus"
          />
        </div>
      </span>
      <span>
        <div class="wrapper" v-if="!editModus">
          <div class="circle" v-if="second6Data.extControl === true">
            <font-awesome-icon :icon="['fas', 'x']" class="red-xmark" />
          </div>
        </div>
        <input type="checkbox" v-model="second6Data.extControl" v-if="editModus" />
      </span>
      <span>
        <div class="wrapper" v-if="!editModus">
          <div class="circle" :class="{ yellow: second6Data.warning === true }"></div>
        </div>
        <input type="checkbox" v-model="second6Data.warning" v-if="editModus" />
      </span>
      <span>
        <div class="wrapper" v-if="!editModus">
          <div class="circle" :class="{ red: second6Data.fault === true }"></div>
        </div>
        <input type="checkbox" v-model="second6Data.fault" v-if="editModus" />
      </span>
      <span>
        <p v-if="!editModus">{{ second6Data.soc }}</p>
        <input type="text" v-model="second6Data.soc" v-if="editModus" />
      </span>
    </div>
    <div class="line right" :class="{ 'right-width': editModus }">
      <span>
        <div class="wrapper" v-if="!editModus">
          <a :href="third2Data.remoteAccessIPAddress" target="_blank" class="button"> Login </a>
        </div>
        <input type="text" v-model="third2Data.remoteAccessIPAddress" v-if="editModus" />
      </span>
      <span>
        <div class="wrapper" v-if="!editModus">
          <a :href="third2Data.location.link" target="_blank" class="gps-link">
            {{ third2Data.location.adress }}
            <p>{{ third2Data.location.link }}</p>
          </a>
        </div>
        <input type="text" v-model="third2Data.location.adress" v-if="editModus" />
        <input type="text" v-model="third2Data.location.link" v-if="editModus" />
      </span>
    </div>
  </main>
</template>

<script>
import { ref, computed, watch, watchEffect } from 'vue'
import FootlineComponent from '../FootlineComponent.vue'

export default {
  components: {
    FootlineComponent
  },
  props: {
    lineData: {
      type: Array,
      required: true
    },
    editModus: {
      type: Boolean,
      required: true
    },
    newLineData: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const editModus = ref(false)

    watch(
      () => props.editModus,
      (newVal) => {
        editModus.value = newVal
      }
    )
    // split lineData into 3 parts
    // first 12
    const first12Data = computed(() => {
      if (Array.isArray(props.lineData)) {
        return props.lineData.slice(0, 12)
      } else if (typeof props.lineData === 'object' && props.lineData !== null) {
        let keys = Object.keys(props.lineData)
        let slicedKeys = keys.slice(0, 12)
        let result = {}
        for (let key of slicedKeys) {
          result[key] = props.lineData[key]
        }
        return result
      } else {
        return []
      }
    })
    // second 6
    const second6Data = computed(() => {
      if (Array.isArray(props.lineData)) {
        return props.lineData.slice(12, 18)
      } else if (typeof props.lineData === 'object' && props.lineData !== null) {
        let keys = Object.keys(props.lineData)
        let slicedKeys = keys.slice(12, 18)
        let result = {}
        for (let key of slicedKeys) {
          result[key] = props.lineData[key]
        }
        return result
      } else {
        return []
      }
    })
    // third 2
    const third2Data = computed(() => {
      if (Array.isArray(props.lineData)) {
        return props.lineData.slice(18, 20)
      } else if (typeof props.lineData === 'object' && props.lineData !== null) {
        let keys = Object.keys(props.lineData)
        let slicedKeys = keys.slice(18, 20)
        let result = {}
        for (let key of slicedKeys) {
          result[key] = props.lineData[key]
        }
        return result
      } else {
        return []
      }
    })

    // variables for lineData
    const lineData = computed(() => ({
      idtCustomer: first12Data.value.idtCustomer,
      endCustomer: first12Data.value.endCustomer,
      country: first12Data.value.country,
      projectId: first12Data.value.projectId,
      inverter: first12Data.value.inverter,
      battery: first12Data.value.battery,
      mtrf: first12Data.value.mtrf,
      gmb: first12Data.value.gmb,
      thirdPartyCooperation: first12Data.value.thirdPartyCooperation,
      delivery: first12Data.value.delivery,
      commissioning: first12Data.value.commissioning,
      customerAcceptance: first12Data.value.customerAcceptance,
      onlineOffline: second6Data.value.onlineOffline,
      runOffIdleChargeDischarge: {
        run: second6Data.value.runOffIdleChargeDischarge.run,
        idle: second6Data.value.runOffIdleChargeDischarge.idle,
        charge: second6Data.value.runOffIdleChargeDischarge.charge
      },
      extControl: second6Data.value.extControl,
      warning: second6Data.value.warning,
      fault: second6Data.value.fault,
      soc: second6Data.value.soc,
      remoteAccessIPAddress: third2Data.value.remoteAccessIPAddress,
      location: {
        adress: third2Data.value.location.adress,
        link: third2Data.value.location.link
      }
    }))

    watchEffect(() => {
      emit('update-line-data', lineData.value)
      console.log(lineData.value)
    })

    return {
      first12Data,
      second6Data,
      third2Data,
      editModus,
      lineData
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/main.scss';

main {
  @include center();
  gap: 0.5rem;
  width: 100%;

  .line {
    @include center();
    padding: 0.5rem 0.5rem;
    gap: 0.5rem;
    height: 4rem;
    border-bottom: 2px solid $highlight-clr-grey;

    span {
      @include center();
      gap: 0.5rem;
      width: 100%;
      text-align: center;

      p {
        margin: 0;
      }

      input {
        text-align: center;
        padding: 0.3rem;
        width: 100%;
        background-color: $background-clr-white;
        border: none;
        border-radius: 0.5rem;
      }

      select {
        padding: 0.3rem;
        width: 5rem;
        background-color: $background-clr-white;
        border: solid 2px $highlight-clr-grey;
        border-radius: 0.5rem;
      }

      .highlight {
        @include center();
        padding: 0.2rem 0.6rem;
        background-color: $highlight-clr-grey;
        border-radius: 0.75rem;
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

      .icon {
        font-size: 1.3em;
      }

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

      a {
        text-decoration: none;
      }

      .gps-link {
        @include center();
        position: relative;
        text-align: left;
        color: $text-clr-black;
        &:hover {
          p {
            display: block;
          }
        }

        p {
          position: absolute;
          top: -2.8rem;
          right: 0rem;
          display: none;
          padding: 0.3rem 0.5rem;
          background-color: $highlight-clr-grey;
          border-radius: 0.75rem;
        }
      }

      .green {
        background-color: $highlight-clr-green;
      }

      .yellow {
        background-color: $highlight-clr-yellow;
      }

      .red {
        background-color: $highlight-clr-red;
      }
    }

    .smaller-width {
      width: 90%;
    }

    .long-text {
      text-align: left;
      font-size: 0.8em;
    }
  }

  .left {
    width: 51.5%;
  }

  .middle {
    width: 30%;
  }

  .right {
    width: 14%;
  }

  .left-width {
    width: 54%;
  }

  .middle-width {
    width: 32%;
  }

  .right-width {
    width: 12%;
  }
}
</style>
