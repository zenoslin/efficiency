<template>
  <div class="home">
    <div class="appinfo" @click="handleAbout">
      <div class="flex justify-center">
        <div class="appinfo-icon warm_flame"></div>
      </div>
      <div class="flex padding justify-center">
        <div class="appinfo-name">{{appInfo.name}}</div>
      </div>
    </div>

    <div class="flex justify-around">
      <div class="card night_fade" @click="handleAverage">
        <div class="card-name">拼单计算器</div>
      </div>
      <!-- <div class="card spring_warmth" @click="handleAverage">
        <div class="card-name">拼单计算器</div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appInfo: {
        name: '效率+',
        imgUrl: '/static/images/user.png'
      }
    };
  },
  components: {},
  methods: {
    handleAbout() {
      wx.navigateTo({ url: '/pages/about/main' });
    },
    handleAverage() {
      wx.navigateTo({ url: '/pages/average/main' });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: #fff;
}
.appinfo {
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
.card {
  width: vw(320);
  height: vw(140);
  position: relative;
  border-radius: vw(20);
  &-name {
    width: 90%;
    @include abs_both_middle;
    text-align: center;
    color: #fff;
  }
}
</style>

