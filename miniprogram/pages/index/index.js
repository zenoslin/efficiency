//index.js
const app = getApp();

Page({
  data: {
    headInfo: {
      class: 'warm_flame',
      name: '效率+'
    },
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib'
      });
      return;
    }
  },

  handleAbout() {
    wx.navigateTo({ url: '../about/about' });
  },
  handleAverage() {
    wx.navigateTo({ url: '../average/average' });
  },
  handleGradient() {
    wx.navigateTo({ url: '../gradient/gradient' });
  }
});