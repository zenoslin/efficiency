Page({
  data: {
    headInfo: {
      class: 'deep_blue',
      name: '毒鸡汤',
      curSoup: '',
      isGetingSoup: false
    }
  },
  onLoad() {
    this.getNewSoup();
  },
  getNewSoup() {
    this.setData({ isGetingSoup: true });
    wx.cloud
      .callFunction({ name: 'soup' })
      .then(res => {
        this.setData({
          curSoup: res.result.content,
          isGetingSoup: false
        });
      })
      .catch(err => {
        console.log('getNewSoup', err);
        this.setData({
          isGetingSoup: false
        });
      });
  },
  handleGetSoup() {
    this.getNewSoup();
  }
});
