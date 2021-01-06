Page({
  data: {
    headInfo: {
      class: 'night_fade',
      name: '拼单计算器'
    },
    personInfo: ['', '', ''],
    realCost: '',
    costInfo: []
  },

  handleIncrease() {
    let personInfo = this.data.personInfo;
    personInfo.push('');
    this.setData({
      personInfo: personInfo
    });
  },
  handleDecrease() {
    let personInfo = this.data.personInfo;
    if (personInfo.length <= 1) return;
    personInfo.pop();
    this.setData({
      personInfo: personInfo
    });
  },
  handleItemInput(event) {
    let newVal = event.detail.value;
    let index = event.target.dataset.id;
    let arr = this.data.personInfo;
    arr[index] = newVal;
    this.setData({
      personInfo: arr
    });
  },
  handleCostInput(event) {
    this.setData({
      realCost: event.detail.value
    });
  },
  averageCost() {
    let arr = [];
    let personArr = this.data.personInfo;
    let realCost = this.data.realCost;
    let isError = false;
    let total = personArr.reduce(
      (previousValue, currentValue) => (previousValue += +currentValue),
      0
    );
    for (let i = 0; i < personArr.length; i++) {
      arr[i] = this.getCostStr(
        (+personArr[i] / total) * +realCost,
        function () {
          isError = true;
        }
      );
    }
    if (isError) {
      wx.showToast({
        title: '请输入金额',
        icon: 'none'
      });
      return;
    }
    this.setData({
      costInfo: arr
    });
  },
  getCostStr(num, fail) {
    if (typeof num !== 'number' || isNaN(num)) {
      fail && fail();
      return `0`;
    }
    return `${num.toFixed(2)}`;
  }
});
