<template>
  <div class="gradient">
    <div class="flex justify-center">
      <div class="gradient-icon lady_lips"></div>
    </div>
    <div class="flex padding justify-center">
      <div class="gradient-name">渐变调色盘</div>
    </div>

    <div class="grid text-center col-3">
      <div v-for="(item,index) in colorArr" :key="index">
        <div class="flex justify-center">
          <div class="gradient-icon" :style="item.style"></div>
        </div>
        <div class="flex padding-top justify-center">
          <div class="gradient-name">{{item.name}}</div>
        </div>
        <div class="flex padding-bottom justify-center">
          <div class="gradient-name">{{item.color}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colors from './colors.js';

export default {
  name: 'gradient',
  data() {
    return {
      colorArr: colors
    };
  }
};
</script>

<style lang="scss" scoped>
.gradient {
  min-height: 100vh;
  background: #fff;
  &-icon {
    width: vw(128);
    height: vw(128);
    border-radius: 50%;
  }
  &-name {
    font-size: vw(26);
    color: #aaa;
  }
}
</style>
