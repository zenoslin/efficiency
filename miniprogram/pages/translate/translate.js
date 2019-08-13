const app = getApp();
const dateUtil = require('../../utils/dateUtil');
const plugin = requirePlugin('WechatSI');

import { language } from '../../utils/conf';

// 获取**全局唯一**的语音识别管理器**recordRecoManager**
const manager = plugin.getRecordRecognitionManager();

Page({
  data: {
    headInfo: {
      class: 'mean_fruit',
      name: '语音翻译'
    },

    inputVal: '', //输入文本
    resultVal: '', //结果文本
    translating: false, //是否翻译中

    recording: false,
    recordStatus: 0, // status: 0-录音中 1-翻译中 2-完成翻译/二次翻译
    currentTranslate: {
      //当前语音输入的内容
      create: '08/13 11:41',
      text: '等待说话'
    },

    bottomButtonDisabled: false, // 底部按钮disabled

    dialogList: [],

    tips_language: language[0], // 目前只有中文

    toView: 'fake', // 滚动位置
    lastId: -1, // dialogList 最后一个item的 id
    currentTranslateVoice: '' // 当前播放语音路径
  },

  setAreaText: function(event) {
    let text = event.detail.value;
    this.setData({
      inputVal: text
    });
  },

  /**
   * 按住按钮开始语音识别
   */
  streamRecord: function(event) {
    console.log('streamRecord', event);
    let detail = event.detail || {};
    let buttonItem = detail.buttonItem || {};
    manager.start({
      lang: buttonItem.lang
    });

    this.setData({
      recordStatus: 0,
      recording: true,
      currentTranslate: {
        // 当前语音输入内容
        create: dateUtil.recordTime(new Date()),
        text: '正在聆听中',
        lfrom: buttonItem.lang,
        lto: buttonItem.lto
      }
    });
    // this.scrollToNew();
  },

  /**
   * 松开按钮结束语音识别
   */
  streamRecordEnd: function(event) {
    console.log('streamRecordEnd', event);

    let detail = event.detail || {}; // 自定义组件触发事件时提供的detail对象
    let buttonItem = detail.buttonItem || {};

    // 防止重复触发stop函数
    if (!this.data.recording || this.data.recordStatus != 0) {
      console.warn('has finished!');
      return;
    }

    manager.stop();
    this.setData({ bottomButtonDisabled: true });
  },

  /**
   * 翻译
   */
  handleTranslate: function(event) {
    if (!this.data.translating) {
      this.setData({
        resultVal: '正在翻译...',
        translating: true
      });
      let text = event.detail.value.input;
      if (text === '') {
        this.setData({
          resultVal: '输入不能为空',
          translating: false
        });
        return;
      }
      let isCN = event.detail.target.dataset.type === 'CN';
      let lfrom = isCN ? 'zh_CN' : 'en_US';
      let lto = isCN ? 'en_US' : 'zh_CN';
      this.translateText(lfrom, lto, text);
    }
  },

  /**
   * 翻译文字
   */
  translateText: function(from, to, text) {
    plugin.translate({
      lfrom: from,
      lto: to,
      content: text,
      tts: true,
      success: resTrans => {
        console.log('success', resTrans);

        let passRetcode = [
          0, // 翻译合成成功
          -10006, // 翻译成功，合成失败
          -10007, // 翻译成功，传入了不支持的语音合成语言
          -10008 // 翻译成功，语音合成达到频率限制
        ];

        if (passRetcode.indexOf(resTrans.retcode) >= 0) {
          this.setData({
            resultVal: resTrans.result
          });
        } else {
          this.setData({
            resultVal: '翻译失败!'
          });
        }
      },
      fail: resTrans => {
        console.log('fail', resTrans);
        this.setData({
          resultVal: '翻译失败!'
        });
      },
      complete: resTrans => {
        this.setData({
          translating: false
        });
      }
    });
  },

  /**
   * 初始化语音识别回调
   * 绑定语音播放开始事件
   */
  initRecord: function() {
    // 有新的识别内容返回， 则会调用此事件
    manager.onRecognize = res => {
      console.log('onRecognize', res);
      let currentData = Object.assign({}, this.data.currentTranslate, {
        text: res.result
      });
      this.setData({
        currentTranslate: currentData
      });
    };
    // 识别结束事件
    manager.onStop = res => {
      console.log('onStop', res);

      let text = res.result;
      if (text === '') {
        // this.showRecordEmptyTip();
        return;
      }

      let lastId = this.data.lastId + 1;

      let currentData = Object.assign({}, this.data.currentTranslate, {
        text: res.result,
        translateText: '正在翻译中',
        id: lastId,
        voicePath: res.tempFilePath
      });

      this.setData({
        currentTranslate: currentData,
        recordStatus: 1,
        lastId: lastId
      });

      console.log('currentData', currentData);
    };
    //识别错误事件
    manager.onError = res => {
      console.log('onError', res);
      this.setData({
        recording: false,
        bottomButtonDisabled: false
      });
    };

    // 语音播放开始事件
    wx.onBackgroundAudioPlay(res => {
      const backgroundAudioManager = wx.getBackgroundAudioManager();
      let src = backgroundAudioManager.src;

      this.setData({
        currentTranslateVoice: src
      });
    });
  },

  // translateText: function(item, index) {
  //   let lfrom = item.lfrom || 'zh_CN';
  //   let lto = item.lto || 'en_US';

  //   plugin.translate({
  //     lfrom: lfrom,
  //     lto: lto,
  //     content: item.text,
  //     tts: true,
  //     success: resTrans => {
  //       let passRetcode = [
  //         0, // 翻译合成成功
  //         -10006, // 翻译成功，合成失败
  //         -10007, // 翻译成功，传入了不支持的语音合成语言
  //         -10008 // 翻译成功，语音合成达到频率限制
  //       ];

  //       if (passRetcode.indexOf(resTrans.retcode) >= 0) {
  //         let tmpDialogList = this.data.dialogList.slice(0);
  //         if (!isNaN(index)) {
  //           let tmpTranslate = Object.assign({}, item, {
  //             autoPlay: true, // 自动播放背景音乐
  //             translateText: resTrans.result,
  //             translateVoicePath: resTrans.filename || '',
  //             translateVoiceExpiredTime: resTrans.expired_time || 0
  //           });

  //           tmpDialogList[index] = tmpTranslate;

  //           this.setData({
  //             dialogList: tmpDialogList,
  //             bottomButtonDisabled: false,
  //             recording: false
  //           });
  //         } else {
  //           console.error('index error', resTrans, item);
  //         }
  //       } else {
  //         console.warn('翻译失败', resTrans, item);
  //       }
  //     },
  //     fail: function(resTrans) {
  //       console.error('调用失败', resTrans, item);
  //       this.setData({
  //         bottomButtonDisabled: false,
  //         recording: false
  //       });
  //     },
  //     complete: resTrans => {
  //       this.setData({ recordStatus: 1 });
  //       wx.hideLoading();
  //     }
  //   });
  // },

  onLoad: function() {
    this.initRecord();

    app.getRecordAuth();
  }
});
