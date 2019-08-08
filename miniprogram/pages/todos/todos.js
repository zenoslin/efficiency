Page({
  data: {
    headInfo: {
      class: 'tempting_azure',
      name: '计划任务'
    },
    allList: [],
    inputVal: '',
    todosList: [],
    doneList: [],
    isShowDone: false,
    btnDoneStr: '显示已完成任务'
  },

  onLoad() {
    this.getAllItem();
  },

  handleEnter(event) {
    let desc = event.detail.value;
    let options = {
      description: desc,
      start: new Date(),
      done: false
    };
    this.addItem(options)
      .then(res => {
        console.log('addSucc', res);
        options._id = res._id;
        this.addItemMock(options);
        this.setData({ inputVal: '' });
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
        this.updateItemMock(_id, true);
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
        this.updateItemMock(_id, false);
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
        this.removeItemMock(_id);
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
      str = '隐藏已完成任务';
    }
    this.setData({
      isShowDone: !isShowDone,
      btnDoneStr: str
    });
  },

  // 添加任务
  addItem: function(options) {
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('todos')
        .add({
          data: options
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

  // 获取所有任务[云函数]
  getAllItem() {
    wx.cloud
      .callFunction({
        name: 'batch'
      })
      .then(res => {
        console.log('succ', res);
        this.setMockData(res.result.data);
      })
      .catch(err => {
        console.log('fail', err);
        this.showNetworkToast();
      });
  },

  // 设置前端数据
  setMockData(list) {
    this.setData({
      allList: list
    });
    this.separateList(list);
  },
  // 分离任务列表
  separateList(list) {
    let todosList = [];
    let doneList = [];
    list.map(item => {
      if (item.done) {
        doneList.push(item);
      } else {
        todosList.push(item);
      }
    });
    this.setData({
      todosList: todosList,
      doneList: doneList
    });
  },
  // 添加前端数据
  addItemMock(options) {
    let allList = this.data.allList;
    allList.push(options);
    this.setMockData(allList);
  },
  // 更新前端数据
  updateItemMock(id, $boolean) {
    let index = this.searchItemByIdMock(id);
    if (index === -1) {
      wx.showToast({
        title: '数据操作错误',
        icon: 'none'
      });
      return;
    }
    let allList = this.data.allList;
    allList[index].done = $boolean;
    this.setMockData(allList);
  },
  // 删除前端数据
  removeItemMock(id) {
    let index = this.searchItemByIdMock(id);
    if (index === -1) {
      wx.showToast({
        title: '数据操作错误',
        icon: 'none'
      });
      return;
    }
    let allList = this.data.allList;
    allList.splice(index, 1);
    this.setMockData(allList);
  },
  // 搜索数据
  searchItemByIdMock(id) {
    let allList = this.data.allList;
    for (let i = 0; i < allList.length; i++) {
      if (allList[i]._id === id) {
        return i;
      }
    }
    return -1;
  },
  // 操作数据库错误通用提示
  showNetworkToast() {
    wx.showToast({
      title: '哦豁网络有点儿问题',
      icon: 'none'
    });
  }
});
