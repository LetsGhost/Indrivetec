<template>
  <main>
    <div class="addNewLine-container">
      <h2>Neue Zeile hinzufügen</h2>
      <div class="input-container">
        <div class="input">
          <label for="idtCustomer">IDT-Customer</label>
          <input type="text" id="idtCustomer" v-model="idtCustomer" />
        </div>
        <div class="input">
          <label for="endCustomer">End Customer</label>
          <input type="text" id="endCustomer" v-model="endCustomer" />
        </div>
        <div class="input">
          <label for="country">Country</label>
          <input type="text" id="country" v-model="country" />
        </div>
        <div class="input">
          <label for="projectID">Projekt-ID</label>
          <input type="text" id="projectID" v-model="projectId" />
        </div>
        <div class="input">
          <label for="inverter">Inverter</label>
          <input type="text" id="inverter" v-model="inverter" />
        </div>
        <div class="input">
          <label for="battery">Battery</label>
          <input type="text" id="battery" v-model="battery" />
        </div>
        <div class="input">
          <label for="mtrf">MTRF</label>
          <input type="checkbox" id="mtrf" v-model="mtrf" />
        </div>
        <div class="input">
          <label for="gmb">GMB</label>
          <input type="checkbox" id="gmb" v-model="gmb" />
        </div>
        <div class="input">
          <label for="thirdPartyCooperation">3ᵗʰ party cooperat</label>
          <input type="text" id="thirdPartyCooperation" v-model="thirdPartyCooperation" />
        </div>
        <div class="input">
          <label for="delivery">Delivery</label>
          <input type="checkbox" id="delivery" v-model="delivery" />
        </div>
        <div class="input">
          <label for="commissioning">Commissioning</label>
          <input type="checkbox" id="commissioning" v-model="commissioning" />
        </div>
        <div class="input">
          <label for="customerAcceptance">Customer acceptance</label>
          <input type="text" id="customerAcceptance" v-model="customerAcceptance" />
        </div>
        <hr />
        <div class="input">
          <label for="onlineOffline">Online/Offline</label>
          <input type="checkbox" id="onlineOffline" v-model="onlineOffline" />
        </div>
        <div class="input">
          <label for="run"> Run/Off </label>
          <input type="checkbox" id="run" v-model="run" />
          <label for="idle"> Idle </label>
          <input type="checkbox" id="idle" v-model="idle" />
          <label for="charge"> Charg/Discharge </label>
          <input type="checkbox" id="charge" v-model="charge" />
        </div>
        <div class="input">
          <label for="extControl">ext. Control</label>
          <input type="checkbox" id="extControl" v-model="extControl" />
        </div>
        <div class="input">
          <label for="warning">Warninig</label>
          <input type="checkbox" id="warning" v-model="warning" />
        </div>
        <div class="input">
          <label for="fault">Fault</label>
          <input type="checkbox" id="fault" v-model="fault" />
        </div>
        <div class="input">
          <label for="soc">SoC</label>
          <input type="text" id="soc" v-model="soc" />
        </div>
        <div class="input">
          <label for="remoteAccessIPAddress">Remote Access/IP-Adress</label>
          <input type="text" id="remoteAccessIPAddress" v-model="remoteAccessIPAddress" />
        </div>
        <div class="input">
          <label for="location">Location</label>
          <input type="text" id="location" v-model="location" />
          <label for="link">GPS Link</label>
          <input type="text" id="link" v-model="link" />
        </div>
      </div>
      <button class="button" @click="addNewLine">Zeile hinzufügen</button>
      <button class="close-win" @click="closeWin">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
    </div>
  </main>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup(_, { emit }) {
    const idtCustomer = ref('')
    const endCustomer = ref('')
    const country = ref('')
    const projectId = ref('')
    const inverter = ref('')
    const battery = ref('')
    const mtrf = ref(false)
    const gmb = ref(false)
    const thirdPartyCooperation = ref('')
    const delivery = ref(false)
    const commissioning = ref(false)
    const customerAcceptance = ref('')
    const onlineOffline = ref(false)
    const run = ref(false)
    const idle = ref(true)
    const charge = ref(false)
    const extControl = ref('')
    const warning = ref('')
    const fault = ref('')
    const soc = ref('')
    const remoteAccessIPAddress = ref('')
    const location = ref('')
    const link = ref('')

    const lineData = computed(() => ({
      idtCustomer: idtCustomer.value,
      endCustomer: endCustomer.value,
      country: country.value,
      projectId: projectId.value,
      inverter: inverter.value,
      battery: battery.value,
      mtrf: mtrf.value,
      gmb: gmb.value,
      thirdPartyCooperation: thirdPartyCooperation.value,
      delivery: delivery.value,
      commissioning: commissioning.value,
      customerAcceptance: customerAcceptance.value,
      onlineOffline: onlineOffline.value,
      runOffIdleChargeDischarge: {
        run: run.value,
        idle: idle.value,
        charge: charge.value
      },
      extControl: extControl.value,
      warning: warning.value,
      fault: fault.value,
      soc: soc.value,
      remoteAccessIPAddress: remoteAccessIPAddress.value,
      location: {
        adress: location.value,
        link: link.value
      }
    }))

    const addNewLine = () => {
      emit('add-line', lineData.value)
      emit('toggle-add-new-line')
      window.electron.send('save-data', lineData.value)
      lineData.value = {}
    }

    const closeWin = () => {
      emit('toggle-add-new-line')
    }

    return {
      idtCustomer,
      endCustomer,
      country,
      projectId,
      inverter,
      battery,
      mtrf,
      gmb,
      thirdPartyCooperation,
      delivery,
      commissioning,
      customerAcceptance,
      onlineOffline,
      run,
      idle,
      charge,
      extControl,
      warning,
      fault,
      soc,
      remoteAccessIPAddress,
      location,
      link,
      addNewLine,
      lineData,
      closeWin
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/main.scss';

main {
  position: absolute;
  top: -10rem;
  z-index: 100;
  @include center();
  margin-top: 10rem;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  .addNewLine-container {
    position: relative;
    @include center();
    flex-direction: column;
    padding: 1rem 1rem 1rem 1rem;
    background-color: $highlight-clr-grey;
    border-radius: 1rem;

    h1 {
      margin: 0;
    }

    .input-container {
      @include center();
      flex-direction: column;
      align-items: start;
      gap: 0.5rem;

      .input {
        @include center();
        justify-content: space-between;
        width: 100%;

        input {
          padding: 0.2rem;
          background-color: $background-clr-white;
          border: none;
          border-radius: 0.5rem;
          color: $text-clr-black;
          font-size: 1em;
        }
      }

      hr {
        width: 100%;
        border: 1px solid $background-clr-black;
        border-radius: 0.75rem;
      }
    }

    .button {
      margin-top: 2rem;
    }

    .close-win {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      @include center();
      padding: 0.5rem;
      height: 2rem;
      width: 2rem;
      background-color: $highlight-clr-red;
      border: none;
      border-radius: 100%;
      color: $highlight-clr-grey;
      font-size: 1em;
      cursor: pointer;
      &:active {
        scale: 0.9;
      }
    }
  }
}
</style>
