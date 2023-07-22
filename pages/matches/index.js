// pages/matches/index.js

const app = getApp()
const utils = require('../../utils/util')

Page({

    /**
     * Page initial data
     */
    data: {

    },

    goToMatch(event) {
      console.log('ID:', event.currentTarget.dataset.matchId);
      const match_id = event.currentTarget.dataset.matchId;
      wx.navigateTo({
        url: `/pages/matches/show?id=${match_id}`,
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
        if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          this.getTabBar().setData({
            selected: 2
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
})