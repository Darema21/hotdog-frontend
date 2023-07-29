// pages/users/profile.js
const app = getApp();

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
      let page = this;
      console.log("index.js", app.globalData.header)
      
        // Get api data
      wx.request({
        url: `${app.globalData.baseUrl}owners/:id`,
        method: 'GET',
        header: app.globalData.header,
        success(res) {
          console.log(res)
          const owner = res.data.owner;
          console.log(owner)
    
          // Update local data
          page.setData({
            owner_name: res.data.owner.name,
            dog_name: res.data.dog.name
          });
      
          wx.hideToast();
        },
        fail(e) {
          console.log(e)
        }
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
        const page = this
      
        if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          this.getTabBar().setData({
            selected: 3
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