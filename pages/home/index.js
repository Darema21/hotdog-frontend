// pages/home/index.js
const app = getApp()
const utils = require('../../utils/util')

Page({

  /**
   * Page initial data
   */
  data: {

  },

  navigateToVenues: function () {
    wx.navigateTo({
      url: '',
    });
  },

  navigateToEvents: function () {
    wx.navigateTo({
      url: '/pages/events/index',
    });
  },

  navigateToDogWiki: function () {
    wx.navigateTo({
      url: '/pages/wiki/index',
    });
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      });
    }
  
    // Store the reference to the page instance in a variable
    const page = this;
  
    wx.request({
      url: `${app.globalData.baseUrl}events`,
      method: 'GET',
      header: app.globalData.header,
      success(res) {
        console.log('Events', res);
        const events = res.data;

        // Get only the first 3 events (latest 3 events)
        events.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
        const latestThreeEvents = events.slice(0, 3);

        page.setData({
          events: latestThreeEvents
        });
      }
    });
  },
  
  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})