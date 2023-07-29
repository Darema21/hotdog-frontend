// pages/events/category.js
Page({

  /**
   * Page initial data
   */
  data: {

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
  onShow: function() {
    const category = this.options.category;
    let page = this;

    wx.request({
      url: `${getApp().globalData.baseUrl}events/category`,
      method: 'GET',
      data: {
        category: category
      },
      success: function(res) {
        console.log(res.data);
        const events = res.data.events
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