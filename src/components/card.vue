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
.card-name {
    width: 90%;
    @include abs_both_middle;
    text-align: center;
    color: #fff;
  }
</style>
