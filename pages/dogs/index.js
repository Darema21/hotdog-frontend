// pages/dogs/index.js
const app = getApp()
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
      console.log("index.js", app.globalData.header)
    
      // Get api data
      wx.request({
        url: `${app.globalData.baseUrl}dogs`,
        method: 'GET',
        header: app.globalData.header,
        success(res) {
          console.log(res)
          const dogs = res.data.dogs;
          console.log(dogs)
    
          // Update local data
          page.setData({
            dogs: dogs
          });
    
          wx.hideToast();
        },
        fail(e) {
          console.log(e)
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