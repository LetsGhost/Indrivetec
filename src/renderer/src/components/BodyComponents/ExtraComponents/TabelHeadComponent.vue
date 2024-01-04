<template>
  <main>
    <div class="head left-container">
      <span v-for="(text, index) in headContentLeft" :key="index">
        {{ text }}
      </span>
    </div>
    <div class="head middle-container">
      <span v-for="(text, index) in headContentMiddle" :key="index">
        {{ text }}
      </span>
    </div>
    <div class="head right-container">
      <span v-for="(text, index) in headContentRight" :key="index">
        {{ text }}
      </span>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
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

    return {
      headContentRight,
      headContentMiddle,
      headContentLeft
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

  .head {
    @include center();
    padding: 0.5rem 0.5rem;
    gap: 0.5rem;
    height: 4rem;
    background-color: $highlight-clr-grey;
    border-radius: 0.75rem;

    span {
      @include center();
      text-align: center;
      width: 100%;
      font-size: 1em;
    }
  }
}
</style>
