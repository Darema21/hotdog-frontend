// pages/matches/index.js
const app = getApp()
const utils = require('../../utils/util')

Page({

  /**
   * Page initial data
   */
  data: {

  },

  goToShow: function (e) {
    const id = e.currentTarget.dataset.id;
    utils.goToShow(id);
  },

  goToMatch(event) {
    console.log("Event match", event)
    const match = event.currentTarget.dataset;
    const match_id = match.id;
    const owner_name = match.ownerName;
    const dog_name = match.dogName;
    const owner_image_url = match.ownerImageUrl;
    const dog_image_url = match.dogImageUrl;

    console.log("Dog url", dog_image_url);

    wx.navigateTo({
      url: `/pages/matches/show?id=${match_id}&owner_name=${owner_name}&dog_name=${dog_name}&dog_image_url=${dog_image_url}&owner_image_url=${owner_image_url}`,
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

    const page = this;

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }

    wx.request({
      url: `${app.globalData.baseUrl}owners/${app.globalData.owner.id}/matches`,
      method: 'GET',
      header: app.globalData.header,
      success(res) {
        const matches = res.data;

        page.setData({
          matches: matches
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