<template>
  <div class="container">
    <main>
      <div class="palceholder"></div>
      <div class="timestamp-container">
        <span>
          <p>Timestamp:</p>
          <p v-if="date !== '' && time !== ''">{{ date }} | {{ time }}</p>
          <p v-if="date === '' || time === ''">dd-mm-yy | hh:mm</p>
        </span>
        <button class="edit-button" @click="editTimestamp">
          <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          <p class="edit-text">bearbeiten</p>
        </button>
      </div>
      <MenueComponent />
    </main>
    <div v-if="toggleEditWin" class="background">
      <div class="edit-timestamp-container">
        <span>
          <p>Timestamp bearbeiten</p>
          <button class="close-win" @click="editTimestamp">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </span>
        <span>
          <div class="wrapper">
            <input v-model="date" type="date" />
            <input v-model="time" type="time" />
            <button @click="setTimeToNow">heute</button>
          </div>
          <button class="button" @click="saveTimeStampEdit">Speichern</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import MenueComponent from './ExtraComponents/MenueComponent.vue'

export default {
  components: {
    MenueComponent
  },
  setup() {
    const toggleEditWin = ref(false)
    const date = ref('')
    const time = ref('')

    // edit timestamp
    const editTimestamp = () => {
      toggleEditWin.value = !toggleEditWin.value
    }

    // set time
    const saveTimeStampEdit = () => {
      toggleEditWin.value = !toggleEditWin.value
      window.electron.send('save-time', { date: date.value, time: time.value })
    }

    // set time to now
    const setTimeToNow = () => {
      const now = new Date()
      const day = now.getDate()
      const month = now.getMonth() + 1
      const year = now.getFullYear()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      date.value = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
      time.value = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`

      toggleEditWin.value = !toggleEditWin.value
      window.electron.send('save-time', { date: date.value, time: time.value })
    }

    return {
      editTimestamp,
      toggleEditWin,
      saveTimeStampEdit,
      date,
      time,
      setTimeToNow
    }
  },

  mounted() {
    // This code will run when the component is mounted to the DOM
    window.electron.send('load-time')
    window.electron.receive('load-time', (data) => {
      this.date = data.date
      this.time = data.time
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

.container {
  @include center();
  width: 100%;
}

main {
  @include center();
  justify-content: space-between;
  margin-top: 1rem;
  width: 95%;

  .timestamp-container {
    position: relative;
    @include center();
    padding: 0.5rem;
    background-color: $company-clr-green;
    border-radius: 0.75rem;
    color: $text-clr-white;
    cursor: pointer;

    span {
      @include center();
      gap: 0.5rem;

      p {
        margin: 0;
      }
    }

    .edit-button {
      position: absolute;
      right: -1.5rem;
      top: -1.6rem;
      @include center();
      padding: 0.75rem;
      background-color: $background-clr-white;
      border: none;
      border-radius: 100%;
      color: $company-clr-green;
      font-size: 1em;
      cursor: pointer;
      &:hover {
        .edit-text {
          display: block;
        }
      }

      .edit-text {
        position: absolute;
        top: -1rem;
        right: -5.5rem;
        display: none;
        padding: 0.3rem 0.5rem;
        background-color: $highlight-clr-grey;
        border-radius: 0.75rem;
        transition: display 0.2s ease-in-out;
      }
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    @include center();
    height: 100vh;
    width: 100vw;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);

    .edit-timestamp-container {
      position: relative;
      @include center();
      flex-direction: column;
      padding: 2.5rem;
      gap: 2rem;
      background-color: $highlight-clr-grey;
      border-radius: 0.75rem;
      color: $text-clr-black;
      cursor: default;

      span {
        @include center();
        flex-direction: column;
        width: 100%;
        gap: 3rem;

        p {
          margin: 0;
          font-size: 1.5em;
          font-weight: 400;
        }

        .wrapper {
          position: relative;
          @include center();
          gap: 0.5rem;

          input {
            padding: 0.2rem;
            background-color: $background-clr-white;
            border: none;
            border-radius: 0.5rem;
            color: $text-clr-black;
            font-size: 1em;
          }

          button {
            position: absolute;
            bottom: -1.5rem;
            right: -0.2rem;
            background-color: transparent;
            border: none;
            font-size: 0.8em;
            cursor: pointer;
            text-decoration: underline;
            &:hover {
              scale: 1.1;
            }
            &:active {
              scale: 0.99;
            }
          }
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
  }
}
</style>
