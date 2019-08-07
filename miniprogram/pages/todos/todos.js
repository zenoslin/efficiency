Page({
  data: {
    headInfo: {
      class: 'tempting_azure',
      name: '计划任务Beta'
    },
    inputVal: '',
    todosList: [],
    doneList: [],
    isShowDone: false,
    btnDoneStr: '显示已完成任务'
  },

  onLoad() {
    this.getUndoneList();
  },

  handleEnter(event) {
    let desc = event.detail.value;
    this.addItem(desc)
      .then(res => {
        this.setData({ inputVal: '' });
        this.getUndoneList();
      })
      .catch(err => {
        console.log('fail', err);
        this.showNetworkToast();
      });
  },
  handleConfirm(event) {
    let _id = event.target.dataset.id;
    this.updateItemById(_id, { done: true })
      .then(res => {
        console.log('suss', res);
        this.getUndoneList();
        this.getDoneList();
      })
      .catch(err => {
        console.log('fail', err);
        this.showNetworkToast();
      });
  },
  handleActivate(event) {
    let _id = event.target.dataset.id;
    this.updateItemById(_id, { done: false })
      .then(res => {
        console.log('suss', res);
        this.getUndoneList();
        this.getDoneList();
      })
      .catch(err => {
        console.log('fail', err);
        this.showNetworkToast();
      });
  },
  handleCancel(event) {
    let _id = event.target.dataset.id;
    this.removeItemById(_id)
      .then(res => {
        console.log('succ', res);
        this.getUndoneList();
        this.getDoneList();
      })
      .catch(err => {
        console.log('fail', err);
        this.showNetworkToast();
      });
  },
  handleShowDone() {
    let isShowDone = this.data.isShowDone;
    let str = '显示已完成任务';
    if (!isShowDone) {
      this.getDoneList();
      str = '隐藏已完成任务';
    }
    this.setData({
      isShowDone: !isShowDone,
      btnDoneStr: str
    });
  },

  // 获取未完成任务列表
  getUndoneList() {
    this.getItemByWhere({
      done: false
    })
      .then(res => {
        console.log('succ', res);
        this.setData({
          todosList: res.data
        });
      })
      .catch(err => {
        console.log('fail', err);
        this.showNetworkToast();
      });
  },
  // 获取已完成任务
  getDoneList() {
    this.getItemByWhere({
      done: true
    })
      .then(res => {
        console.log('succ', res);
        this.setData({
          doneList: res.data
        });
      })
      .catch(err => {
        console.log('fail', err);
        this.showNetworkToast();
      });
  },

  // 添加任务
  addItem: function(desc) {
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('todos')
        .add({
          data: {
            description: desc,
            start: new Date(),
            done: false
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // 根据状态获取任务
  getItemByWhere(options) {
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('todos')
        .where(options)
        .get()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // 更新任务
  updateItemById(id, options) {
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('todos')
        .doc(id)
        .update({ data: options })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // 删除任务
  removeItemById(id) {
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('todos')
        .doc(id)
        .remove()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // 操作数据库错误通用提示
  showNetworkToast() {
    wx.showToast({
      title: '哦豁网络有点儿问题',
      icon: 'none'
    });
  }
});
