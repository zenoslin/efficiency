<template>
  <div class="home bg-white">
    <div class="appinfo">
      <div class="appinfo-icon"></div>
      <!-- <img class="appinfo-img" :src="appInfo.imgUrl" /> -->
      <div class="appinfo-name">
        {{appInfo.name}}
      </div>
    </div>

    <div class="cardbox">
      <div class="cardbox-average" @click="handleAverage">
        <card :text="`拼单计算器`">
          <a href="/pages/average/main"></a>
        </card>
      </div>
      <!-- <div class="cardbox-2">
        <card :text="`0009`">
          <a href="/pages/average/main"></a>
        </card>
      </div> -->
    </div>
  </div>
</template>

<script>
import card from '@/components/card';

export default {
  data() {
    return {
      appInfo: {
        name: '效率+',
        imgUrl: '/static/images/user.png'
      }
    };
  },
  components: {
    card
  },
  methods: {
    handleAverage() {
      wx.navigateTo({ url: '/pages/average/main' });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
}
.appinfo {
  width: 100%;
  @include abs_horizontal_middle();
  top: 0;
  &-icon {
    width: vw(128);
    height: vw(128);
    @include abs_horizontal_middle();
    top: 0;
    border-radius: 50%;
    background-image: linear-gradient(135deg, #f6d242 10%, #ff52e5 100%);
  }
  // &-img {
  //   width: vw(128);
  //   height: vw(128);
  //   @include abs_horizontal_middle();
  //   top: 0;
  //   border-radius: 50%;
  // }
  &-name {
    @include abs_horizontal_middle();
    top: vw(148);
    color: #aaa;
  }
}
.cardbox {
  width: 100%;
  height: vw(800);
  position: absolute;
  top: vw(240);
  left: 0;
  &-average {
    position: absolute;
    top: vw(20);
    left: vw(40);
  }
  &-2 {
    position: absolute;
    top: vw(20);
    right: vw(40);
  }
}
</style>

