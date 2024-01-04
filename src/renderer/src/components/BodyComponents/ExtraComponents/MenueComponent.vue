<template>
  <div>
    <main>
      <p>Menü</p>
      <font-awesome-icon :icon="['fas', 'bars']" />
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
@import '../../../styles/main.scss';

main {
  @include center();
  gap: 0.5rem;
  cursor: not-allowed;
}
</style>
