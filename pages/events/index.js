// pages/index/index.js
const app = getApp()
const utils = require('../../utils/util');

Page({
  /**
   * Page initial data
   */
  data: {
    
  },

  navigateToCategoryPage: function(event) {
    const category = event.currentTarget.dataset.category;
    const url = `/pages/events/category?category=${category}`;
    console.log(url)
    wx.navigateTo({
      url: url,
    });
  },
  
  goToEvent(e) {
    const id = e.currentTarget.dataset.id;
    utils.goToEvent(id);
  },

  addBooking: function (options) {
    const page = this;
    const event_id = options.currentTarget.dataset.id;
    console.log("Event id:", event_id);

    const events = page.data.events;
    const updatedEvents = events.map(event => {
      if (event.id === event_id) {
        if (event.has_booking) {
          event.has_booking = false; // Cancel the booking
        } else {
          event.has_booking = true; // Add the booking
        }
      }
      return event;
    });

    page.setData({
      events: updatedEvents
    });

    // Send a request to the server to add/delete the booking
    wx.request({
      url: `${getApp().globalData.baseUrl}events/${event_id}/booking`,
      method: 'POST', // or 'DELETE' depending on the scenario
      header: app.globalData.header,
    
      data: {
        booking: {
          event_id: event_id,
          owner_id: app.globalData.owner.id 
        }
      },  
      success(res) {
        if (res.statusCode === 200) {
          console.log("Created booking");
        } else {
          console.log("Failed to update booking");
        }
      },
      fail(res) {
        // Handle the failure response
        console.log(res);
        wx.showToast({
          title: 'Failed to update booking',
          icon: 'none',
          duration: 2000
        });
      }
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
      
  let page = this;

  // Get api data
  wx.request({
    url: `${getApp().globalData.baseUrl}events`,
    method: 'GET',
    header: getApp().globalData.header,
    success(res) {
      const events = res.data;
      
      page.setData({
        events: events
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