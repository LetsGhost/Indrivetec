<template>
  <div>
    <HeaderComponent />
    <main>
      <HeadlineComponent />
      <div class="tabel-container">
        <TabelComponent />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import HeadlineComponent from './components/BodyComponents/HeadlineComponent.vue'
import TabelComponent from './components/BodyComponents/TabelComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  components: {
    HeaderComponent,
    HeadlineComponent,
    TabelComponent,
    FooterComponent
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/main.scss';

main {
  @include center();
  flex-direction: column;
  margin-top: 1rem;

  // .tabel-container {
  //   padding: 0.2rem;
  //   height: 70vh;
  //   overflow-y: scroll;
  //   overflow-x: hidden;
  // }
}
</style>
