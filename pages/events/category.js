// pages/events/category.js
const app = getApp()
const utils = require('../../utils/util');

Page({

  /**
   * Page initial data
   */
  data: {

  },

  goToEvent(e) {
    const id = e.currentTarget.dataset.id;
    utils.goToEvent(id);
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log("Options", options);
    let page = this;
    const category = this.options.category;

    wx.request({
      url: `${getApp().globalData.baseUrl}events/category`,
      method: 'GET',
      header: app.globalData.header,
      data: {
        category: category
      },
      success: function(res) {
        console.log("Category response", res.data);
        const events = res.data
        page.setData({
          category: category,
          events: events
        })
      },
      fail: function(error) {
        console.error(error);
      }
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

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