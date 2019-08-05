<template>
  <div class="about">
    <div class="flex justify-center">
      <div class="about-icon everlasting_sky"></div>
    </div>
    <div class="flex padding justify-center">
      <div class="about-name">{{about.name}}</div>
    </div>
    <div class="flex padding justify-center">
      <div class="about-desc">{{about.desc}}</div>
    </div>

    <div class="flex padding justify-center">
      <div class="about-github">{{about.github}}</div>
    </div>
    <div class="flex padding justify-center">
      <div class="about-email">{{about.email}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      about: {
        name: 'Zenos Lin',
        desc: '沉迷设计的前端搬砖工',
        text: '这是一个提高生活效率的小工具',
        email: 'zenoslin@outlook.com',
        github: 'https://github.com/'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.about {
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
  &-desc {
    font-size: vw(26);
    color: #aaa;
  }
  &-github {
    font-size: vw(26);
    color: #aaa;
  }
  &-email {
    font-size: vw(26);
    color: #aaa;
  }
}
</style>

