//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'efficiency-mrvib',
        traceUser: true
      });
    }
  },
  // 权限询问
  getRecordAuth: function() {
    wx.getSetting({
      success(res) {
        console.log('succ', res);
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              console.log('succ auth');
            },
            fail() {
              console.log('fail auth');
            }
          });
        } else {
          console.log('record has been authed');
        }
      },
      fail(res) {
        console.log('fail', res);
      }
    });
  },
  onHide: function() {
    wx.stopBackgroundAudio();
  },

  globalData: {
    history: []
  }
});
