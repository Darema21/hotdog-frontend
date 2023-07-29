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

  addBooking: function(options) {
    console.log("Index options", options);
    const page = this;
    const eventId = options.currentTarget.dataset.id;
    console.log({ eventId })
  
    const events = page.data.events;
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        if (event.has_booking) {
          event.has_booking = false; // Cancel the booking
        } else {
          event.has_booking = true; // Add the booking
        }
      }
      return event;
    });
  
    page.setData({ events: updatedEvents });
  
    // Send a request to the server to add/delete the booking
    wx.request({
      url: `${getApp().globalData.baseUrl}events/${eventId}/booking`,
      method: 'POST', // or 'DELETE' depending on the scenario
      data: {
        booking: {
          event_id: eventId,
          user_id: 1
        }
      },
      success(res) {
        // Handle the success response
        console.log(res)
        if (res.statusCode === 200) {
          wx.showToast({
            title: 'Booking updated successfully',
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: 'Failed to update booking',
            icon: 'none',
            duration: 2000
          });
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