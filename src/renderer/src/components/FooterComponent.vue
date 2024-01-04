<template>
  <div>
    <main>
      <span>
        <p>Copyright © PA Ehrling</p>
        <p>Container Program BESS</p>
      </span>
      <span class="right">
        <p>Confidential</p>
        <p>for internal use only</p>
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
  position: fixed;
  bottom: 0;
  left: 0;
  @include center();
  justify-content: space-between;
  padding: 1rem;
  width: 100%;

  span {
    @include center();
    align-items: start;
    flex-direction: column;

    p {
      margin: 0;
    }
  }

  .right {
    align-items: end;
    margin-right: 2rem;
  }
}
</style>
