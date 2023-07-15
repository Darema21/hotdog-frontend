// pages/wiki/index.js
const utils = require('../../utils/util')
const app = getApp()

Page({

    goToBreed(e) {
        const id = e.currentTarget.dataset.id;
        utils.goToBreed(id);
    },

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
    onShow() {
        const page = this;

        if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          this.getTabBar().setData({
            selected: 1
          })
        }

        wx.request({
          url: `${app.globalData.baseUrl}breeds`,
          method: 'GET',
        //   header: app.globalData.header,
          success(res){
              console.log(res)
                page.setData({
                    data: res.data
                })
          }
        })
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