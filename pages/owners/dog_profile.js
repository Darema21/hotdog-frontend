// pages/owners/dog_profile.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    owner: null,
    dog: null,
    dog_breed: null,
    dog_img: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({
      owner: app.globalData.owner,
      dog: app.globalData.currentOwnerDog,
      dog_breed: app.globalData.currentOwnerDogBreed,
      dog_img: app.globalData.currentOwnerDogImage
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
  onShow() {

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