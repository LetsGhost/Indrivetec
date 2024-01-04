<template>
  <div>
    <main>
      <img src="../assets/INDRIVETECAG.svg" alt="company logo" />
      <span>
        <p>BESS Project Overview</p>
        <p>Interllectual property of Indrivetec AG Zurich</p>
      </span>
    </main>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

main {
  @include center();
  justify-content: space-between;
  padding: 1.8rem 1rem;
  border-bottom: 1px solid $background-clr-black;

  span {
    @include center();
    align-items: end;
    flex-direction: column;

    p {
      margin: 0;
    }
  }
}
</style>
