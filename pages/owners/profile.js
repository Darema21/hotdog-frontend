// pages/users/profile.js
const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {
    owner: {},
    dog: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log("Profile:", options)
    // Set the owner and dog data from app.globalData
    this.setData({
      owner: app.globalData.owner,
      dog: app.globalData.currentOwnerDog
    });
  },

  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
      const page = this
    
      if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
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
});
