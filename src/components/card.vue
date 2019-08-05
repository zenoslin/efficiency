<template>
  <div class="card radius shadow bg-red">
    <div class="card-name">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['text']
};
</script>

<style lang="scss" scoped>
.card {
  width: vw(320);
  height: vw(140);
  position: relative;
  margin: 0;
  background-image: linear-gradient(135deg, #fff6b7 10%, #f6416c 100%);
  &-name {
    width: 90%;
    @include abs_both_middle;
    text-align: center;
    color: #fff;
  }
}
</style>
