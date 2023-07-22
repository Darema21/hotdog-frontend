const utils = require('../../utils/util');
const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {
    // Add any initial data if needed
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    // options object contains query parameters from the previous page
    const fromOwnerId = options.from_owner_id;
    const toOwnerId = options.to_owner_id;

    // You can use the owner IDs to fetch data from the backend or perform any necessary operations
    // For example, you can fetch data for dogs related to these owners

    // Example API request using wx.request
    wx.request({
      url: `${app.globalData.baseUrl}owners/${fromOwnerId}`,
      method: 'GET',
      success: (res) => {
        console.log("res", res)
        const dogsForFromOwner = res.data;
        console.log("dogsForFromOwner", dogsForFromOwner);
        console.log('Dogs for from_owner_id:', dogsForFromOwner);
      },
      fail: (error) => {
        console.error('Failed to fetch dogs for from_owner_id:', error);
      },
    });

    wx.request({
      url: `${app.globalData.baseUrl}owners/${toOwnerId}`,
      method: 'GET',
      success: (res) => {
        const dogsForToOwner = res.data;
        console.log('Dogs for to_owner_id:', dogsForToOwner);
      },
      fail: (error) => {
        console.error('Failed to fetch dogs for to_owner_id:', error);
      },
    });

    // Perform any other necessary operations with the owner IDs or data
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    // Do something when page ready
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    // Do something when page shown
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
  onTabItemTap(item) {
    // Do something when tab item tapped
  },
});
