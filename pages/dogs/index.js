// pages/dogs/index.js
const utils = require('../../utils/util');
const app = getApp()

Page({

    /**
     * Page initial data
     */
    data: {

    },

    goToShow(i) {
        const id = e.currentTarget.dataset.dogsid;
        utils.goToShow(id);
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
      const page = this
      
      console.log(this.getTabBar())
      if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }

      wx.request({
        url: `${app.globalData.baseUrl}dogs`,
        method: 'GET',
        header: app.globalData.header,
        success(res) {
            const dogs = res.data;
            console.log(dogs)
            //Update local data
            page.setData({
                dogs: dogs
            });

            wx.hideToast();
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