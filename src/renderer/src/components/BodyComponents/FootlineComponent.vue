<template>
  <div class="container">
    <div class="counter">
      <p>Anzahl: {{ arrayCount }}</p>
    </div>
    <!-- add line to tabel -->
    <div class="button add-line" @click="addNewLine" :class="{ 'add-modus-active': editModus }">
      <font-awesome-icon :icon="['fas', 'plus']" />
      <!-- hints -->
      <div class="hint add">
        <p>Neue Zeile hinzufügen</p>
      </div>
    </div>
    <!-- edit tabel -->
    <div
      class="button edit-tabel"
      @click="toggleEditModus"
      :class="{ 'edit-modus-active': editModus }"
    >
      <p v-if="editModus">Bearbeiten Modus aktiv</p>
      <font-awesome-icon :icon="['fas', 'pen-to-square']" />
      <!-- hints -->
      <div class="hint edit">
        <p>Tabelle bearbeiten</p>
      </div>
    </div>
  </div>
  <AddNewLineComponent v-if="toggleAddNewLine" @toggleAddNewLine="addNewLine" @addLine="addLine" />
</template>

<script>
import { ref } from 'vue'
import AddNewLineComponent from './ExtraComponents/AddNewLineComponent.vue'

export default {
  components: {
    AddNewLineComponent
  },
  props: {
    arrayCount: {
      type: Number,
      required: true
    },
    editModus: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    // add new line to tabel
    const toggleAddNewLine = ref(false)
    const addNewLine = () => {
      toggleAddNewLine.value = !toggleAddNewLine.value
    }

    // add new line to tabel
    const addLine = (lineData) => {
      emit('add-Line', lineData)
    }

    // edit tabel
    const toggleEditModus = () => {
      emit('toggleEditModus')
    }

    return {
      addNewLine,
      toggleAddNewLine,
      addLine,
      toggleEditModus
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

.container {
  position: relative;
  @include center();
  justify-content: space-between;
  width: 100%;

  .counter {
    @include center();
    padding: 0.25rem 1rem;
    background-color: $company-clr-green;
    border: 2px solid $company-clr-green;
    border-radius: 0.75rem;
    color: $text-clr-white;
    font-size: 1em;

    p {
      margin: 0;
    }
  }

  .add-line {
    &:hover {
      .add {
        display: block;
      }
    }
  }

  .edit-tabel {
    &:hover {
      .edit {
        display: block;
      }
    }
  }

  .add-modus-active {
    &:hover {
      .add {
        display: none;
      }
    }
  }

  .edit-modus-active {
    @include center();
    gap: 0.5rem;
    background-color: $highlight-clr-red;
    border: 2px solid $highlight-clr-red;
    &:hover {
      color: $text-clr-white;

      .edit {
        display: none;
      }
    }

    p {
      margin: 0;
    }
  }

  .hint {
    position: absolute;
    @include center();
    padding: 0.3rem 0.5rem;
    background-color: $highlight-clr-grey;
    border-radius: 0.75rem;
    color: $text-clr-black;

    p {
      margin: 0;
    }
  }

  .add {
    display: none;
    top: -1rem;
    left: 52%;
  }

  .edit {
    display: none;
    top: -1rem;
    right: 2%;
  }
}
</style>
