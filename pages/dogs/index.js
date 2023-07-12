// pages/dogs/index.js
Page({

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
      
      let page = this;
    
      // Get api data
      wx.request({
        url: `${getApp().globalData.baseUrl}dogs`,
        method: 'GET',
        header: getApp().globalData.header,
        success(res) {
          const dogs = res.data.dogs;
          console.log(dogs)
    
          // Update local data
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