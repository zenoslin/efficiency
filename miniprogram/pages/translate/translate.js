const app = getApp();
const plugin = requirePlugin('WechatSI');

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
    recording: false, //录音中
    recordStatus: 0, // status: 0-初始值/完成翻译 1-录音中 2-翻译中
    recordType: 0, // 默认0-zh_CN 1-en_US
    translateVoice: '', //语音路径

    btnCNCss: 'mean_fruit', //按钮样式 默认'mean_fruit' 按下'amy_crisp'
    btnENCss: 'mean_fruit' //按钮样式 默认'mean_fruit' 按下'amy_crisp'
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
    if (this.data.recordStatus !== 0) return; // 有执行中的动作

    console.log('streamRecord', event);
    let isCN = event.target.dataset.type === 'CN';
    let lang = isCN ? 'zh_CN' : 'en_US';
    let type = isCN ? 0 : 1;
    this.setData({
      recordStatus: 1,
      recording: true,
      resultVal: '正在录音...',
      recordType: type
    });
    manager.start({
      lang: lang
    });

    if (isCN) {
      this.setData({
        btnCNCss: 'amy_crisp'
      });
    } else {
      this.setData({
        btnENCss: 'amy_crisp'
      });
    }
    // this.scrollToNew();
  },

  /**
   * 松开按钮结束语音识别
   */
  streamRecordEnd: function(event) {
    console.log('streamRecordEnd', event);

    // 防止重复触发stop函数
    if (!this.data.recording || this.data.recordStatus != 1) {
      console.warn('has finished!');
      return;
    }
    
    manager.stop();

    let isCN = event.target.dataset.type === 'CN';
    if (isCN) {
      this.setData({
        btnCNCss: 'mean_fruit'
      });
    } else {
      this.setData({
        btnENCss: 'mean_fruit'
      });
    }
  },

  /**
   * 翻译
   */
  handleTranslate: function(event) {
    if (this.data.recordStatus !== 0) return; // 有执行中的动作

    this.setData({
      resultVal: '正在翻译...',
      translating: true
    });
    let text = event.detail.value.input;
    if (text === '') {
      this.setData({
        resultVal: '输入不能为空',
        translating: false,
        recordStatus: 0,
        translateVoice: ''
      });
      return;
    }
    console.log('text', text);
    let isCN = event.detail.target.dataset.type === 'CN';
    let lfrom = isCN ? 'zh_CN' : 'en_US';
    let lto = isCN ? 'en_US' : 'zh_CN';
    this.translateText(lfrom, lto, text);
  },

  handlePlayVoice: function() {
    if (this.data.translateVoice === '') {
      wx.showToast({
        title: '暂时没有音频',
        icon: 'none'
      });
      return;
    }

    const backgroundAudioManager = wx.getBackgroundAudioManager();
    if (!backgroundAudioManager.paused) {
      // 停止之前的音频播放
      backgroundAudioManager.stop();
    }
    // 当设置了新的 src 时，会自动开始播放
    backgroundAudioManager.title = '语音识别';
    backgroundAudioManager.src = this.data.translateVoice;
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
            translating: false,
            recordStatus: 0,
            resultVal: resTrans.result,
            translateVoice: resTrans.filename
          });
        } else {
          this.setData({
            translating: false,
            recordStatus: 0,
            resultVal: '翻译失败!',
            translateVoice: ''
          });
        }
      },
      fail: resTrans => {
        console.log('fail', resTrans);
        this.setData({
          translating: false,
          recordStatus: 0,
          resultVal: '翻译失败!',
          translateVoice: ''
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
      this.setData({
        inputVal: res.result
      });
    };
    // 识别结束事件
    manager.onStop = res => {
      console.log('onStop', res);

      let text = res.result;
      if (text === '') {
        this.setData({
          inputVal: '',
          resultVal: '请重新输入',
          translating: false,
          recording: false,
          recordStatus: 0
        });
        return;
      }
      this.setData({
        resultVal: '正在翻译...',
        translating: true,
        recording: false,
        recordStatus: 2
      });

      let lfrom = this.data.recordType === 0 ? 'zh_CN' : 'en_US';
      let lto = this.data.recordType === 0 ? 'en_US' : 'zh_CN';
      this.translateText(lfrom, lto, text);
    };
    //识别错误事件
    manager.onError = res => {
      console.log('onError', res);
      this.setData({
        resultVal: '语音识别错误，请重新输入...',
        recording: false,
        recordStatus: 0
      });
    };

    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onError(function() {
      wx.showToast({
        title: '播放错误',
        icon: 'none'
      });
    });
  },

  onLoad: function() {
    this.initRecord();
    app.getRecordAuth();
  }
});
