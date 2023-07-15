App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
    // Load custom font
    this.loadCustomFont();
  },
  loadCustomFont: function () {
    wx.loadFontFace({
      family: "Quicksand",
      global: true,
      source: 'url("/pages/index/Quicksand-bold.ttf")',
      desc: {
        style: "normal",
        weight: "bold"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    });
  
    wx.loadFontFace({
      family: "Quicksand",
      global: true,
      source: 'url("/pages/index/Quicksand-regular.ttf")',
      desc: {
        style: "normal",
        weight: "normal"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    });

    wx.loadFontFace({
      family: "Quicksand",
      global: true,
      source: 'url("/pages/index/Quicksand-light.ttf")',
      desc: {
        style: "normal",
        weight: "light"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    });
  },
  
  globalData: {
    userInfo: null,
    user: null,
    header: {},
    baseUrl: 'http://localhost:3000/api/v1/'
  }
});
