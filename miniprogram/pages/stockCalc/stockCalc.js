Page({
  data: {
    headInfo: {
      class: 'ripe_malinka',
      name: '止损计算器'
    },
    cost: '',
    price: '',
    risk: '',
    calcResult: {
      isShow: false,
      rise: 0,
      fall: 0,
      rise2price: 0,
      fall2price: 0
    }
  },
  handleCostInput(event) {
    this.setData({
      cost: event.detail.value
    });
  },
  handlePriceInput(event) {
    this.setData({
      price: event.detail.value
    });
  },
  handleRiskInput(event) {
    this.setData({
      risk: event.detail.value
    });
  },
  handleCalc() {
    let { cost, price, risk } = this.data;
    if (!cost) {
      wx.showToast({
        title: '成本不能为空',
        icon: 'none'
      });
      return;
    }
    if (!price) {
      wx.showToast({
        title: '现价不能为空',
        icon: 'none'
      });
      return;
    }
    if (!risk) {
      wx.showToast({
        title: '风险调节系数不能为空',
        icon: 'none'
      });
      return;
    }
    cost = +cost;
    price = +price;
    risk = +risk;
    const res = {
      isShow: true,
      rise: Math.floor(cost * (1 + risk) * 1000) / 1000,
      fall: Math.floor(cost * (1 - risk) * 1000) / 1000, 
      rise2price: Math.floor(((cost * (1 + risk)) / price - 1) * 10000) / 100,
      fall2price: Math.floor(((cost * (1 - risk)) / price - 1) * 10000) / 100
    };
    this.setData({ calcResult: res });
  }
});
