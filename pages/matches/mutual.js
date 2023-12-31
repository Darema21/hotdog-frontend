const utils = require('../../utils/util');
const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {
    fromDogAnimation: null,
    toDogAnimation: null,
    match_id: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  data: {
    fromDogAnimationData: {}, 
    toDogAnimationData: {} 
  },

  onLoad: function (options) {
    console.log("Mutual options", options);
    let page = this;
    page.setData({
      match_id: options.id
    });
  },
  
  
  onReady: function () {
    // Create animation objects for both images
    const animationFrom = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });


    animationFrom.right('10%').step();
    animationFrom.rotate(15).step();

    this.setData({
      fromDogAnimationData: animationFrom.export()
    });

 
    const animationTo = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });


    animationTo.left('10%').step();

    animationTo.rotate(-15).step();

    this.setData({
      toDogAnimationData: animationTo.export()
    });
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    // Do something when page shown

    let page = this;
  
    wx.request({
      url: `${app.globalData.baseUrl}owners/${app.globalData.owner.id}/matches/${page.data.match_id}`,
      method: 'GET',
      header: app.globalData.header,
      success(res) {
        const matches = res.data;
  
        page.setData({
          matches: matches
        });
      }
    });
  },
 

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    // Do something when page hidden
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    // Do something when page unload
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    // Do something when pull down
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    // Do something when page reach bottom
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    // Return custom share data when user share
  },

  /**
   * Called when page scroll
   */
  onPageScroll: function (event) {
    // Do something when page scroll
  },

  /**
   * Called when user click on floating tab
   */
  onTabItemTap: function (item) { // Corrected the method name
    // Do something when tab item tapped
  },
});