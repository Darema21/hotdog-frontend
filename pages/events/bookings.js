const app = getApp();
const utils = require('../../utils/util');

Page({
  /**
   * Page initial data
   */
  data: {
    booked_events: [],
    created_events: [], // Add an empty array to store events data
  },

  goToEvent(e) {
    const id = e.currentTarget.dataset.id;
    utils.goToEvent(id);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    // Code to execute when the page is initially rendered
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    let page = this;
    const owner_id = app.globalData.owner.id;

    // Get api data
    wx.request({
      url: `${getApp().globalData.baseUrl}owners/${owner_id}`,
      method: 'GET',
      header: getApp().globalData.header,
      success(res) {
        console.log("Bookings data", res);
        const events = res.data;
        // Corrected the line to set events data from the API response
        page.setData({
          booked_events: events.booked_events,
          created_events: events.created_events
        });

        // Assuming you want to hide a toast, you should show it before hiding
        wx.showToast({
          title: 'Data loaded successfully',
          icon: 'success',
          duration: 2000,
        });
        wx.hideToast();
      },
    });
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {
    // Code to execute when the page is hidden
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {
    // Code to execute when the page is unloaded
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {
    // Code to execute when the user pulls down to refresh
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {
    // Code to execute when the page reaches the bottom
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {
    // Return custom share data when the user shares
  },
});
